import { Component, OnInit } from '@angular/core';
import { MenuNameService } from 'src/app/services/menu-name-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirestoreService } from '../../services/firestore.service';

@Component({
	selector: 'app-customer-request',
	templateUrl: './customer-request.component.html',
	styleUrls: ['./customer-request.component.scss']
})
export class CustomerRequestComponent implements OnInit {
	OrderForm: FormGroup;
	todaydate: any;
	result: any;
	currentproduct: any;
	orderedItem: any;
	customerName = '';
	constructor(
		private menuNameService: MenuNameService,
		private builder: FormBuilder,
		private dataBase: FirestoreService
	) {
		this.OrderForm = builder.group({
			customerName: [''],
			table: [0],
			delivery: false
		});

		this.menuNameService.currentProduct.subscribe((obj) => {
			this.currentproduct = obj;
			this.order(this.currentproduct);
		});
	}

	getTotal(result: any[]) {
		return result.reduce(
			(iterator: number, element: { subtotal: number }) => {
				return iterator + element.subtotal;
			},
			0
		);
	}

	order(obj: {}) {
		this.result = obj;
		this.result.forEach((element: {}) => (this.orderedItem = element));
	}
	reduceProduct(item: {
		product: string;
		price: number;
		quantity: number;
		subtotal: number;
	}) {
		const newObj = {
			product: item.product,
			price: item.price,
			quantity: item.quantity,
			subtotal: item.subtotal
		};
		return this.menuNameService.reduceProductOrder(newObj);
	}

	deleteProduct(item: {
		product: string;
		price: number;
		quantity: number;
		subtotal: number;
	}) {
		const newObj = {
			product: item.product,
			price: item.price,
			quantity: item.quantity,
			subtotal: item.subtotal
		};
		return this.menuNameService.deleteProductOrder(newObj);
	}
	sendOrder(
		values: { customerName: string; table: number; delivery: boolean },
		result: any,
		todaydate: any
	) {
		const finalOrder = {
			customerName: values.customerName,
			tableNumber: values.table,
			delivery: values.delivery,
			date: todaydate,
			order: result
		};
		// console.log(finalOrder);
		this.dataBase.sendOrderToKitchen(finalOrder);
		console.log('sent to kitchen');
		this.menuNameService.resetOrder();
		this.OrderForm.reset();
	}
	cancelOrder() {
		this.menuNameService.resetOrder();
		this.OrderForm.reset();
		console.log('Cancelled Order');
	}

	ngOnInit() {
		this.todaydate = this.menuNameService.todayDate();
		// this.sendOrder(this.OrderForm.value, this.result, this.todaydate);
	}
}
