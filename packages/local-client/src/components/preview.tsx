import "./preview.css";
import { ReactNode, useEffect, useRef } from "react";

interface PreviewProps {
  code: string;
  bundlingStatus: string;
  children?: ReactNode;
}

const html = `
  <html>
   <head>
   <style>html {background-color:white;}</style>
   </head>
   <body>
     <div id="root"></div>
     <script>
       const handleError =(err)=>{
        const root = document.querySelector('#root');
        root.innerHTML = '<div style="color:red;"> <h4>Runtime error</h4>' + err +  '</div>';
        console.error(err);
       };

       window.addEventListener('error',(event)=>{
        event.preventDefault();
        handleError(event.error);
       })

       window.addEventListener('message', (e)=>{
        try{
          eval(e.data);
        }
        catch(err){
          handleError(err);
        }
       },false)
     </script>
   </body>
  </html>
  `;

const Preview: React.FC<PreviewProps> = ({
  code,
  bundlingStatus,
  children,
}) => {
  const iframe = useRef<any>();

  useEffect(() => {
    //fires an event listener from parent JS Execution contex{(postMessage()}
    //iframe listents to that event
    //assigning iframe to ref for referencing using useRef
    //ref tag helps iframe element to access native methods like contentWindow
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      ></iframe>

      {bundlingStatus && <div className="preview-error">{bundlingStatus}</div>}
    </div>
  );
};

export default Preview;
