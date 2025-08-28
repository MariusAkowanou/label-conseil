export interface MenuConfig {
    brand: {
        name: string;
        logo: string;
        route: string;
    };
    navigation: MenuItem[];
}

export interface MenuItem {
    label: string;
    route?: string;
    type: 'link' | 'dropdown';
    icon?: string;
    highlight?: boolean;
    items?: DropdownItem[];
}

export interface DropdownItem {
    label: string;
    route: string;
    icon?: string;
    description?: string;
}