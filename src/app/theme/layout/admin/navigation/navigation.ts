import {Injectable} from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'admin',
    title: 'Administrativo',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'home',
        title: 'Home',
        type: 'item',
        url: 'home',
        classes: 'nav-item',
        icon: 'feather icon-home'
      },
      {
        id: 'usuario',
        title: 'Usuarios',
        type: 'collapse',
        icon: 'feather icon-users',
        children: [
          {
            id: 'usuario_create',
            title: 'Crear',
            type: 'item',
            url: 'usuario/new',
            target: false,
            breadcrumbs: true
          },
          {
            id: 'usuario_search',
            title: 'Consultar',
            type: 'item',
            url: 'usuario/',
            target: false,
            breadcrumbs: true
          }
        ]
      },
      {
        id: 'inventories',
        title: 'Inventarios',
        type: 'collapse',
        icon: 'feather icon-package',
        children: [
        ]
      },
      {
        id: 'reports',
        title: 'Reportes',
        type: 'collapse',
        icon: 'feather icon-clipboard',
        children: [
        ]
      },
    ]
  },
  {
    id: 'supervisor',
    title: 'Jefe de campo',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'schedule',
        title: 'Programación',
        type: 'collapse',
        icon: 'feather icon-calendar',
        children: [
          {
            id: 'schedule_create',
            title: 'Crear',
            type: 'item',
            url: 'schedule/new',
            target: false,
            breadcrumbs: true
          },
          {
            id: 'schedule_search',
            title: 'Consultar',
            type: 'item',
            url: 'schedule/',
            target: false,
            breadcrumbs: true
          },
          {
            id: 'calendar',
            title: 'Calendario',
            type: 'item',
            url: 'schedule/calendar',
            target: false,
            breadcrumbs: true
          }
        ]
      },
      {
        id: 'zona',
        title: 'Zonas de campo',
        type: 'collapse',
        icon: 'feather icon-sunset',
        children: [
          {
            id: 'zona_create',
            title: 'Crear',
            type: 'item',
            url: 'zona/new',
            target: false,
            breadcrumbs: true
          },
          {
            id: 'zona_search',
            title: 'Consultar',
            type: 'item',
            url: 'zona',
            target: false,
            breadcrumbs: true
          }
        ]
      },
      {
        id: 'labores',
        title: 'Labores de campo',
        type: 'collapse',
        icon: 'feather icon-feather',
        children: [
          {
            id: 'labores_create',
            title: 'Crear',
            type: 'item',
	          url: 'labor/new',
            target: false,
            breadcrumbs: true
          },
          {
            id: 'labores_search',
            title: 'Consultar',
            type: 'item',
            url: 'labor/',
            target: false,
            breadcrumbs: true
          }
        ]
      },
    ]
  },
  {
    id: 'operator',
    title: 'Operador de Campo',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'binnacle',
        title: 'Bitácora',
        type: 'collapse',
        icon: 'feather icon-book',
        children: [
          {
            id: 'bitacora_create',
            title: 'Crear',
            type: 'item',
	          url: 'bitacora/new',
            target: false,
            breadcrumbs: true
          },
          {
            id: 'bitacora_search',
            title: 'Consultar',
            type: 'item',
            url: 'bitacora',
            target: false,
            breadcrumbs: true
          }
        ]
      },
    ]
  }
];

@Injectable()
export class NavigationItem {
  public get() {
    return NavigationItems;
  }
}
