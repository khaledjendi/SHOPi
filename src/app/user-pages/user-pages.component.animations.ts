import { trigger, transition, state, animate, style, keyframes, useAnimation, query, animateChild, group, stagger } from '@angular/animations';

export const userPageAnimation = trigger('userPageAnimation', [
  state('collapsed', style({
    height: 0,
    width: 0,
    paddingTop: 0,
    paddingBottom: 0,
    opacity: 0
  })),

  transition('collapsed => expanded', [
    animate('300ms ease-out', style({
      height: '*',
      width: '*',
      paddingTop: '*',
      paddingBottom: '*'
    })),
    animate('500ms', style({ opacity: 1 }))
  ]),

  transition('expanded => collapsed', [
    animate('150ms ease-in')
  ])
]);
