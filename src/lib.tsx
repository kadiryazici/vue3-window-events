import {
   AllowedComponentProps,
   ComponentCustomProps,
   Fragment,
   defineComponent,
   h,
   onActivated,
   onBeforeUnmount,
   onDeactivated,
   onMounted,
   ref
} from 'vue';

type ComponentEvents = {
   [Key in keyof WindowEventMap as `on${Capitalize<string & Key>}`]?: (
      event: WindowEventMap[Key]
   ) => void;
};

export interface WindowEventsComponentProps
   extends AllowedComponentProps,
      ComponentCustomProps,
      ComponentEvents {}

interface WindowEventsComponent {
   new (): {
      $props: WindowEventsComponentProps;
   };
}

const filterEvents = (attrs: Record<string, any>) => {
   return Object.keys(attrs).reduce((acc, key) => {
      if (key.slice(0, 2) === 'on' && typeof attrs[key] === 'function') {
         return {
            ...acc,
            [key]: attrs[key]
         };
      }
      return acc;
   }, {} as typeof attrs);
};

const cleanupEvents = (eventNames: string[], events: Record<string, any>) => {
   eventNames.forEach((eventName) => {
      const event = getEventName(eventName);
      window.removeEventListener(event, events[eventName]);
   });
};

const applyEvents = async (eventNames: string[], events: Record<string, any>) => {
   // settimeout 0 is needed because if you mount the component it is so fast that catches events before you mount it.
   //example you clicked a button to navigate another page and in that page this component listens click event
   // as you may guess click event fires
   setTimeout(() => {
      eventNames.forEach((eventName) => {
         const event = getEventName(eventName);
         window.addEventListener(event, events[eventName]);
      });
   }, 0);
};

const getEventName = (eventName: string) => eventName.slice(2).toLowerCase();

export const WindowEvents = defineComponent({
   name: 'Window',
   inheritAttrs: false,
   setup(_props, { attrs }) {
      const didMount = ref(false);
      const events = filterEvents(attrs);
      const eventNames = Object.keys(events);
      console.log({ events });
      onMounted(() => {
         didMount.value = true;
         applyEvents(eventNames, events);
      });
      onActivated(() => {
         if (didMount.value) return;
         applyEvents(eventNames, events);
      });
      onBeforeUnmount(() => {
         didMount.value = false;
         cleanupEvents(eventNames, events);
      });
      onDeactivated(() => {
         didMount.value = false;
         cleanupEvents(eventNames, events);
      });

      return {
         didMount
      };
   },
   render() {
      return h(Fragment, []);
   }
}) as WindowEventsComponent;
