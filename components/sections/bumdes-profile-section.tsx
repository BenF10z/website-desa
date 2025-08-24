import Image from "next/image"

export default function BumdesProfileSection() {
  return (
    <section className="w-full px-4 md:px-8 lg:px-[120px] py-[60px] flex flex-col justify-start items-center gap-16">
      {/* First Row */}
      <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-20">
        <div className="flex-1 lg:max-w-[445px]">
          <Image
            src="/placeholder.svg?height=311&width=445"
            alt="BUMDes Kenteng"
            width={445}
            height={311}
            className="w-full h-auto rounded-2xl object-cover"
          />
        </div>
        <div className="w-full lg:w-[675px] flex flex-col justify-center items-start gap-8">
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="text-[#6e7869] text-sm font-bold font-['Satoshi'] uppercase tracking-[4.20px]">
              bumdes
            </div>
            <div className="text-[#041b06] text-2xl md:text-3xl lg:text-4xl font-bold font-['Satoshi'] tracking-wider">
              Profil BUMDES Desa Kenteng
            </div>
          </div>
          <div className="text-[#1a1a1a] text-sm md:text-base font-normal font-['Satoshi'] tracking-tight leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin elementum quam vel dignissim. Mauris rhoncus orci vel tellus dapibus hendrerit. Nunc ultricies ac ante vitae porta. In mattis facilisis commodo. Suspendisse congue lorem nunc, id ullamcorper justo imperdiet interdum. Pellentesque viverra dui ut quam tristique, non porttitor turpis fringilla. Quisque sodales quam pellentesque turpis aliquet elementum.
            <br/><br/>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-20">
        <div className="w-full lg:w-[677px] flex flex-col justify-center items-start gap-8 lg:gap-20 order-2 lg:order-1">
          <div className="text-[#1e1e1e] text-sm md:text-base font-normal font-['Satoshi'] tracking-tight leading-relaxed">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            <br/><br/>
           Maecenas hendrerit sagittis justo eu tristique. Aliquam a orci nunc. Cras porttitor molestie tellus, at efficitur ipsum interdum at. Curabitur sed ante porta, condimentum felis at, porttitor mauris. Vivamus auctor, lectus id consequat vestibulum, risus est sagittis nunc, hendrerit dapibus augue quam quis erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
           
          </div>
        </div>
        <div className="flex-1 lg:max-w-[443px] order-1 lg:order-2">
          <Image
            src="/placeholder.svg?height=309&width=443"
            alt="BUMDes Activities"
            width={443}
            height={309}
            className="w-full h-auto rounded-2xl object-cover"
          />
        </div>
      </div>
    </section>
  )
}