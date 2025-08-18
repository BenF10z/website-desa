import Image from "next/image"
import CTAButton from "@/components/ui/cta-button"

export default function AboutSection() {
  return (
    <div className="py-12 md:py-20 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-12 md:gap-16">
          {/* About Kenteng Village */}
          <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-20">
            <Image
              src="/images/village-landscape.jpg"
              alt="Kenteng Village Landscape"
              width={491}
              height={343}
              className="w-full max-w-[491px] h-[250px] md:h-[343px] lg:w-[491px] lg:h-[343px] rounded-2xl object-cover"
            />
            <div className="flex-1 flex flex-col justify-center items-start gap-6 md:gap-8">
              <div className="flex flex-col justify-center items-start gap-2">
                <div className="text-[#6e7869] text-sm font-bold font-['Satoshi'] uppercase tracking-[4.20px]">about</div>
                <div className="text-[#043c09] text-2xl md:text-4xl font-bold font-['Satoshi'] tracking-wider">About Kenteng Village</div>
              </div>
              <div className="text-[#1a1a1a] text-sm md:text-base font-normal font-['Satoshi'] tracking-tight leading-relaxed">
                Tucked away in the misty highlands of Central Java, Kenteng is more than just a village — it's a heartbeat. A place where mornings begin with the smell of firewood and the sound of roosters echoing through the valley. Where children run barefoot through rice fields, and elders share stories under the shade of banana trees.<br/><br/>
                Here, time doesn't rush — it gently flows.<br/>
                You'll hear laughter bubbling from bamboo kitchens. See weathered hands crafting baskets from memory, not manuals. Taste dishes that carry generations of tradition in every bite. Feel the rhythm of a village that moves not by clock, but by connection.
              </div>
            </div>
          </div>

          {/* Tradisi & Kehidupan */}
          <div className="w-full flex flex-col lg:flex-row justify-center items-stretch gap-8 lg:gap-20">
            <div className="flex-1 flex flex-col justify-center items-start gap-12 md:gap-20 order-2 lg:order-1 lg:h-[280px] md:lg:h-[452px] lg:lg:h-[489px]">
              <div className="w-full lg:max-w-[491px] text-[#1e1e1e] text-sm md:text-base font-normal font-['Satoshi'] tracking-tight leading-relaxed">
                You don't just visit Kenteng — you step into a slower, softer way of living.<br/>
                One where mornings begin with birdsong and the smell of firewood drifting through the hills. Where strangers wave from their porches. Where every meal is shared, every smile is genuine, and silence is never awkward — only peaceful.<br/><br/>
                You might find yourself learning to grind spices with a local grandma, your hands stained yellow from fresh turmeric. Moments like these aren't staged — they're offered. And if you stay long enough, you'll realize something beautiful:<br/><br/>
                It's where travelers become guests, guests become friends, and friends come back again and again.
              </div>
              <div className="w-full lg:max-w-[491px]">
                <CTAButton href="/profil/sejarah" variant="primary" size="default">
                  Lihat Selengkapnya
                </CTAButton>
              </div>
            </div>
            <Image
              src="/images/village-landscape.jpg"
              alt="Kenteng Village Activities"
              width={647}
              height={452}
              className="w-full max-w-[800px] h-[280px] md:h-[452px] lg:w-[800px] lg:h-[489px] rounded-2xl object-cover order-1 lg:order-2"
            />
          </div>
        </div>
      </div>
    </div>
  )
}