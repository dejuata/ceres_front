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
        id: 'users',
        title: 'Usuarios',
        type: 'collapse',
        icon: 'feather icon-users',
        children: [
          {
            id: 'users_create',
            title: 'Crear',
            type: 'item',
            url: '/users/new',
            target: false,
            breadcrumbs: true
          },
          {
            id: 'users_search',
            title: 'Consultar',
            type: 'item',
            url: 'users/list',
            target: false,
            breadcrumbs: true
          }
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
        id: 'zona',
        title: 'Zonas de campo',
        type: 'collapse',
        icon: 'feather icon-sunset',
        children: [
          {
            id: 'zona_create',
            title: 'Crear',
            type: 'item',
            url: '/zona/new',
            target: false,
            breadcrumbs: true
          },
          {
            id: 'zona_search',
            title: 'Consultar',
            type: 'item',
            url: '/zona/',
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
            url: '',
            target: false,
            breadcrumbs: true
          }
        ]
      },
    ]
  },
];

@Injectable()
export class NavigationItem {
  public get() {
    return NavigationItems;
  }
}
