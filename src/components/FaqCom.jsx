import React ,{useEffect,useState} from 'react'
import { getFaq } from '../utils/api'
const FaqCom = ({ onFaqStatusChange }) => {  

   const [faqItems, setFaqItems] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  const getdata = async () => {
    const faqs = await getFaq();
    const hasData = faqs && faqs.faqItems && faqs.faqItems.length > 0;
    setFaqItems(faqs.faqItems || []);
    onFaqStatusChange(hasData); // Notify parent component about FAQ data status
  };

  useEffect(() => {
    getdata();
  }, []);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div>
                   {faqItems.map((items,index)=>(
            <div className="accordion-item" key={items.questionId}>
              <h2 className="accordion-header">
                <button
             className={`accordion-button ${openIndex === index ? '' : 'collapsed'}`}
             type="button"
             onClick={() => handleToggle(index)}
             aria-expanded={openIndex === index}
                >
                  {items.question}
                </button>
              </h2>
               <div
               id={`flush-collapse${index}`}
               className={`accordion-collapse collapse ${openIndex === index ? 'show' : ''}`}
               data-bs-parent="#accordionFlushExample"
             >
                <div className="accordion-body">
                  {items.answer}
                </div>
              </div>
            </div>
                        ))} 
    </div>
  )
}

export default FaqCom