'use client';
import { Bounded } from '@/components/Bounded';
import { Content } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { View } from '@react-three/drei';
import Scene from './Scene';

export type AlternatingTextProps =
  SliceComponentProps<Content.AlternatingTextSlice>;

const AlternatingText = ({ slice }: AlternatingTextProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="alternating-text-container relative bg-yellow-300 text-sky-950"
    >
      <div>
        <div className="grid relative z-40">
          <View className="alternating-text-view absolute left-0 top-0 h-screen w-full">
            <Scene />
          </View>
          {slice.primary.text_group.map((item, idx) => (
            <div
              key={`${item.heading}-${idx}`}
              className="alternating-section grid h-screen place-items-center gap-x-12 md:grid-cols-2"
            >
              <div
                className={`${idx % 2 === 0 ? 'col-start-1' : 'md:col-start-2'} rounded-lg p-4 backdrop-blur-lg max-md:bg-white/30 `}
              >
                <div className="text-balance text-6xl font-bold">
                  <PrismicRichText field={item.heading} />
                </div>
                <div className="mt-4 text-xl">
                  <PrismicRichText field={item.body} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default AlternatingText;
