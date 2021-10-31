import { CSSProperties, defineComponent, ref } from 'vue';

import { WindowEvents } from '../../../src/lib';
import { defineDemo } from '../../helpers';

const sActiveItem: CSSProperties = {
   color: 'blue',
   fontWeight: 'bold'
};

const component = defineComponent({
   name: 'Select',
   setup() {
      const list = ref([
         'Go to store',
         'Learn english and german',
         'listen despacito 10 hours straight'
      ]);
      const activeItem = ref(0);

      const listenKey = (e: KeyboardEvent) => {
         switch (e.key) {
            case 'w': {
               if (activeItem.value === 0) {
                  activeItem.value = list.value.length - 1;
                  return;
               }
               activeItem.value -= 1;
               return;
            }

            case 's': {
               if (activeItem.value === list.value.length - 1) {
                  activeItem.value = 0;
                  return;
               }
               activeItem.value += 1;
               return;
            }
         }
      };
      return {
         listenKey,
         list,
         activeItem
      };
   },
   render() {
      return (
         <div>
            <WindowEvents onKeyup={this.listenKey} />
            <p>
               USE <span style={sActiveItem}>W</span> and <span style={sActiveItem}>S</span> to
               cycle
            </p>
            <ul>
               {this.list.map((todo, index) => (
                  <div style={[this.activeItem === index ? sActiveItem : '']}>{todo}</div>
               ))}
            </ul>
         </div>
      );
   }
});

export const Demo = defineDemo({
   name: 'Select Component',
   component
});
