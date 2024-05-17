import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import QRCode from "react-qr-code";
import isMobile from "is-mobile";
import classNames from "classnames";
import { SocialIcon } from "react-social-icons";
import { isBrowser } from "../utils";

const IndexPage: React.FC<PageProps> = () => {
  const isMobileCached = React.useMemo(() => {
    return isMobile();
  }, []);

  const contactFileUrl = React.useMemo(() => {
    if (!isBrowser()) return "";

    return [window.location.origin, "/static/contact.vcf"].join("");
  }, []);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const cardRef = React.useRef<HTMLElement>(null);

  const performCardTurn = React.useCallback(
    (event: MouseEvent) => {
      if (!cardRef.current || !containerRef.current) return;

      let midWidth = containerRef.current.clientWidth / 2.0;
      let widthMultiplier = (-10 * (midWidth - event.pageX)) / midWidth;
      let midHeight = containerRef.current.clientHeight / 2.0;
      let heightMultiplier = (10 * (midHeight - event.pageY)) / midHeight;

      cardRef.current.style.transform = [
        "perspective(750px)",
        `rotateY(${widthMultiplier}deg)`,
        `rotateX(${heightMultiplier}deg)`,
      ].join("");
    },
    [cardRef.current, containerRef.current]
  );
  const iconSize = { height: 35, width: 35 };

  React.useEffect(() => {
    containerRef.current?.addEventListener("mousemove", performCardTurn);
    return () => {
      containerRef.current?.removeEventListener("mousemove", performCardTurn);
    };
  }, [cardRef.current, containerRef.current]);

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-dvh items-center justify-center font-['Lato']"
    >
      <div className="bg-main bg-landscape"></div>
      <main
        ref={cardRef}
        className="relative h-[252px] w-[420px] overflow-hidden rounded-md shadow-xl shadow-gray-800"
      >
        <div className="bg-card bg-tiles"></div>
        <div className="bg-card bg-gradient-to-b from-transparent via-white via-60% to-white"></div>
        <a
          className={classNames(
            "absolute right-8 top-6 flex flex-col items-center gap-1",
            { disabled: !isMobileCached }
          )}
          href={contactFileUrl}
        >
          <QRCode value={contactFileUrl} size={100} />
          <span className="text-xs uppercase opacity-70">Contact Card</span>
        </a>
        <section className="relative flex min-h-full min-w-full items-end">
          <div className="flex flex-1 flex-col gap-1 px-8 py-4">
            <h1 className="font-['Arvo'] text-2xl font-extrabold">
              David LoBosco
            </h1>
            <h2 className="text-xs font-light uppercase tracking-widest">
              product designer and full stack developer
            </h2>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SocialIcon
                  network="github"
                  color="black"
                  style={iconSize}
                  href="https://github.com/dqlobo"
                  className="hover:opacity-50"
                />
                <SocialIcon
                  network="linkedin"
                  href="https://linkedin.com/in/dqlobo"
                  className="hover:opacity-50"
                  bgColor="black"
                  style={iconSize}
                />
              </div>
              <a
                className="lin cursor-not-allowed text-sm "
                href="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDdma2N0MzB0cWcxdXNxYXJhaDNwY20wdDRtOHRjaGVreGJ3cTVpdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o72FkiKGMGauydfyg/giphy.gif"
              >
                Continue to Blog &rsaquo;
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
