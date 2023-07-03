import { useTypedSelector } from "./use-typed-selector";
export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cell;
    const orderedCells = order.map((id) => data[id]);
    //cumulativeCode consists all code of all codeCells of type Code
    const showFunc = `
        import _React from 'react';
        import _ReactDOM from 'react-dom';
    
        const root=document.querySelector('#root');
        var show =(value)=>{
          if(typeof value === 'object'){
            if(value.$$typeof && value.props){
              _ReactDOM.render(value, root)
            }
            else{
              root.innerHTML=JSON.stringify(value)
            }
          }
          else{
            root.innerHTML=value;
          }
        }
        `;
    const showFuncNoop = `var show=()=>{}`;
    const cumulativeCodeArray = [];
    for (let c of orderedCells) {
      if (c.type === "code") {
        if (c.id === cellId) {
          cumulativeCodeArray.push(showFunc);
        } else {
          cumulativeCodeArray.push(showFuncNoop);
        }
        cumulativeCodeArray.push(c.content);
      }

      if (c.id === cellId) {
        break;
      }
    }

    return cumulativeCodeArray;
  }).join("\n");
};
