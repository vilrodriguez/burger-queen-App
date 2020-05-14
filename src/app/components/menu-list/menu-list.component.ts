import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { MenuNameService } from '../../services/menu-name-service.service';

@Component({
	selector: 'app-menu-list',
	templateUrl: './menu-list.component.html',
	styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {
	menuString: string;
	public menuItems = [];
	menuNameToShow: string;
	img: Observable<string | null>;
	constructor(
		private dataBase: FirestoreService,
		private menuNameService: MenuNameService
	) {}

	translateMenuName(menuNameFromButtons) {
		if (this.menuString === 'breakfast') {
			this.menuNameToShow = 'DESAYUNO';
		} else if (this.menuString === 'lunch') {
			this.menuNameToShow = 'PLATOS';
		} else if (this.menuString === 'sideDishes') {
			this.menuNameToShow = 'ACOMPAÑANTES';
		} else if (this.menuString === 'drinks') {
			this.menuNameToShow = 'bebidas';
		}
		return (this.menuItems = menuNameFromButtons) && this.menuNameToShow;
	}

	getCustomerRequest(item) {
		const newObj = {
			product: item.product,
			price: item.price,
			image: item.image,
			quantity: 1,
			subtotal: item.price
		};
		return this.menuNameService.changeProduct(newObj);
	}
	ngOnInit() {
		this.menuNameService.currentString.subscribe((strng) => {
			this.menuString = strng;
			this.dataBase
				.getDataByCategory(this.menuString)
				.subscribe((data) => {
					this.translateMenuName(data);
				});
		});
	}
}
