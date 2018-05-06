import { trigger, transition, state, animate, style, keyframes, useAnimation, query, animateChild, group, stagger } from '@angular/animations';

export const orderExpandCollapse = trigger('orderExpandCollapse', [
  state('collapsed', style({
    height: 0,
    paddingTop: 0,
    paddingBottom: 0,
    opacity: 0
  })),

  transition('collapsed => expanded', [
    animate('300ms ease-out', style({
      height: '*',
      paddingTop: '*',
      paddingBottom: '*'
    })),
    animate('1s', style({ opacity: 1 }))
  ]),

  transition('expanded => collapsed', [
    animate('300ms ease-in')
  ])
]);
