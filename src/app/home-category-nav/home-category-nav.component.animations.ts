import { trigger, transition, state, animate, style, keyframes, useAnimation, query, animateChild, group, stagger } from '@angular/animations';

export const expandCollapse = trigger('expandCollapse', [
  state('collapsed', style({
    height: 0,
    paddingTop: 0,
    paddingBottom: 0,
    opacity: 0,
    display: 'none'
  })),

  transition('collapsed => expanded', [
    animate('300ms ease-out', style({
      height: '*',
      paddingTop: '*',
      paddingBottom: '*',
      opacity: 1,

    })),
    animate('1s', style({ display: 'block' }))
  ]),

  transition('expanded => collapsed', [
    animate('100ms ease-in')
  ])
]);
