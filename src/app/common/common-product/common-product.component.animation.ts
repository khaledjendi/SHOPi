import { trigger, transition, state, animate, style, keyframes, useAnimation, query, animateChild, group, stagger } from '@angular/animations';

export const cartAnimation = trigger('cartAnimation', [
    state('collapsed', style({
        height: 0,
        width: 0,
        paddingTop: 0,
        paddingBottom: 0,
        opacity: 0,
        display: 'none'
    })),

    transition('collapsed => expanded', [
        animate('300ms ease-out', style({
            height: '*',
            width: '*',
            paddingTop: '*',
            paddingBottom: '*',
            opacity: 1,

        })),
        animate('1s', style({ display: 'block' }))
    ]),

    transition('expanded => collapsed', [
        style({ backgroundColor: '#fd7e14' }),
        animate('0.5s ease-out', keyframes([
            style({
                offset: .2,
                opacity: 1,
                transform: 'translateX(20px)'
            }),
            style({
                offset: 1,
                opacity: 0,
                transform: 'translateX(-100%)'
            }),
        ])
        )
    ])
]);
