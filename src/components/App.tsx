import CVRender from "./CVRender";
import Form from "./Form";
import TemplateSelector from "./TemplateSelector";


export default function App(){
  return(
    <>
      <TemplateSelector />
      <Form />
      <CVRender />
    </>
  )
}