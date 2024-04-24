import { animate, keyframes, query, stagger, state, style, transition, trigger } from "@angular/animations";

export const slideRightDefault = trigger('slideRight',[
    transition('* => *', [
        query(':enter', [
            style({ opacity: 0, transform: 'translateX(-100%)' }),
            stagger(400,[animate('300ms ease-out',
                keyframes([
                    style({
                        opacity: 1,
                        transform: 'translateX(0%)'
                    })
                ]))])
        ], { optional: true })
    ]),
]);

export const addCatagoryState = trigger('addCatagory',[
    transition(':enter', [
        style({
          transform: 'translateY(-100%)'
        }),
        animate('500ms', style({
          transform: 'translateY(0)'
          })
        )
      ]),
      transition(':leave',[
        style({
          transform: 'translateY(0)'
        }),
        animate('500ms', style({
          transform: 'translateY(-100%)'
        }))
      ])
]);
export const fadeEffectState = trigger('fadeEffect',[
    transition(':enter', [
        style({ opacity: 0}),
        animate(300)
    ]),
    transition(':leave', 
        animate(100, style({opacity: 0}))
    )
]);
export const selectRecordState = trigger('selectRecord',[
    transition('default => selected',[
        style({ transform: 'scale(1.02)' }),
        // style({ opacity: 0 }),
        animate('500ms ease-out')
    ]),
    transition('selected => default',[
        style({  }),
        animate('500ms ease-out')
    ])

]);

export const modalEffectState = trigger('modalEffect', [
    transition('hidden => showed',[
        style({ transform: 'scale(0.7)' }),
        animate(300)
    ])
]);

export const cartState = trigger('cartTrigger',[
    transition(':enter',[
        style({ transform: 'scale(0.7)'}),
        animate(300)
    ]),
    transition(':leave', [
        animate(300, style( { transform: 'scale(-1.02)'}))
    ])
])

export const cartCounterState = trigger('cartCounter', [
    state('increase', style({})),
    state('decrease', style({})),
    transition('decrease => increase', [
        style({ transform : 'scale(1.02)'}),
        animate(300)
    ])
]);

export const validationState = trigger('validationEffect',[
    transition(':enter', [
        style({ 
            transform: 'scaleX(0.01)' 
        }),
        animate('500ms ease-in-out')   
    ]),
    transition(':leave', 
        animate(500, style( {transform: 'scale(0.2)' }))
    )
]);
export const showMsgState = trigger('showMsg',[
    transition(':enter', [
        style({ 
            // transform: 'translateY(-100%)'
            opacity: 0 
        }),
        animate('500ms ease-in')
    ]),
    transition(':leave', 
        animate(500, style( {transform: 'scale(0.2)' }))
    )
]);
export const catagoryItemSlideState = trigger('catagoryItemSlide',[
    transition('slideUp => slideDown', [
        // animate('500ms',
        //     keyframes([
        //         style({
        //         opacity: 0,
        //         transform: 'translateY(-100%)',
        //         // offset: 0
        //         }),
        //         style({
        //         opacity: 1,
        //         transform: 'translateY(15%)',
        //         // offset: 0.4
        //         }),
        //         style({
        //         transform: 'translateY(0)',
        //         // offset: 1
        //         }),
        //     ])
        // )
        style({
          transform: 'translateY(-30%)'
        }),
        animate('500ms ease-out', style({
          transform: 'translateY(0)'
        }))
      ]),
      transition('slideDown => slideUp', [
        // animate('500ms',
        //     keyframes([
        //         style({
        //         // opacity: 0,
        //         transform: 'translateY(0)',
        //         // offset: 0
        //         }),
        //         style({
        //         // opacity: 1,
        //         transform: 'translateY(15%)',
        //         // offset: 0.4
        //         }),
        //         style({
        //         transform: 'translateY(-100%)',
        //         // offset: 1
        //         }),
        //     ])
        // )
        style({
          transform: 'translateY(0)'
        }),
        animate('500ms ease-in', style({
          transform: 'translateY(-30%)'
        }))
      ])    
]);
export const deleteRecordState = trigger('deleteRecord',[
    transition(':enter', [
        animate('300ms ease-in',keyframes([
            // style({ transform: 'translateX(-100%)', offset: 0 }),        
            // style({ transform: 'translateX(-15%)', offset: 0.4 }),
            // style({ opacity: 0, transform: 'translateX(0%)', offset: 1 })
            style({ opacity: 0 }),
            style({ opacity: 0.5 }),
            style({ opacity: 1 })
            
        ]))
    ]),
    transition(':leave', [
        animate('300ms ease-in',keyframes([
            style({ transform: 'translateX(0%)', offset: 0 }),        
            style({ transform: 'translateX(-15%)', offset: 0.4 }),
            style({ opacity: 0, transform: 'translateX(100%)', offset: 1 })
        ]))
    ])
]);

export const anyState = trigger('anystate',[
    transition('* => void', [
        style({ opacity: 0}),
        animate(300)
    ]),
    // transition(':leave', 
    //     animate(100, style({opacity: 0}))
    // )
])