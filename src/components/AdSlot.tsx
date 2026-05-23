import { useEffect } from "react";

type AdSlotProps = {
  adSlot?: string;
  style?: React.CSSProperties;
};

export function AdSlot({ adSlot = "", style = {} }: AdSlotProps) {
  const client = import.meta.env.VITE_GOOGLE_ADSENSE_CLIENT;

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // ignore
    }
  }, []);

  if (!client) return null;

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", ...style }}
      data-ad-client={client}
      data-ad-slot={adSlot}
      data-ad-format="auto"
    />
  );
}

export default AdSlot;
