import { Star } from "@/components/ui/star";
import { motion } from "framer-motion";

import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiDocker,
} from "react-icons/si";


export function Benefits() {
  return (
    <section        id="benefits"
      className=""
      >

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-3xl uppercase font-bold mb-6 font-display">Why Choose CodeChimp</h2>
      </motion.div>
   

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 w-full justify-center items-center py-4">
        
     
        
        <div className="flex flex-row gap-1 text-yellow-300 justify-left">
          <Star /> <Star /> <Star /> <Star /> <Star /> 
        </div>

        <div className="text-xl ">Expertise with delivery</div>
        
        <div className="flex flex-col gap-2">
          <span>4.9 rating on Fiverr</span>
          <span>50+ ratings</span>
          <span>‘Top Rated’ category</span>
        </div>
        


        <div className="flex flex-row flex-wrap gap-4 justify-left">
          <img src="/uploads/companies/amazon.svg" className="size-12" />
          <img src="/uploads/companies/microsoft.svg" className="size-12"  />
          <img src="/uploads/companies/netflix.svg" className="size-12"  />
          <img src="/uploads/companies/paypal.svg" className="size-12"  />
          
        </div>

        <div className="text-xl">Leadership level talent</div>

        <div className="flex flex-col gap-2">
          <span>4 experienced co-founders</span>
          <span>Worked at Amazon, Microsoft, Netflix and Paypal</span>
        </div>



        <div className="flex flex-row flex-wrap gap-1  justify-left">
          <img src="/uploads/stack/android.svg" className="size-12" />
          <img src="/uploads/stack/aws.svg" className="size-12" />
          <img src="/uploads/stack/figma.svg" className="size-12" />
          <img src="/uploads/stack/html5.svg" className="size-12" />
          <img src="/uploads/stack/firebase.svg" className="size-12" />
          <img src="/uploads/stack/gitlab.svg" className="size-12" />
          <img src="/uploads/stack/js.svg" className="size-12" />
          <img src="/uploads/stack/python.svg" className="size-12" />
          <img src="/uploads/stack/github.svg" className="size-12" />
          <img src="/uploads/stack/docker.svg" className="size-12" />
          <img src="/uploads/stack/reactjs.svg" className="size-12" />
          <img src="/uploads/stack/ruby.svg" className="size-12" />
          <img src="/uploads/stack/typescript.svg" className="size-12" />
          <img src="/uploads/stack/nodejs.svg" className="size-12" />
          <img src="/uploads/stack/postfresql.svg" className="size-12" />
          <img src="/uploads/stack/tailwind.svg" className="size-12" />
        </div>

        <div className="text-xl">AI and SaaS Specialists</div>

        <div className="flex flex-col gap-2">
          <span>Modern tech stack experts</span>
          <span>Building with latest AI technology</span>
        </div>

      </div>

            
    </section>
  );
}
