import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function scrollToElement(container, target, offset = 24) {
    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    container.scrollTo({
        top: container.scrollTop + (targetRect.top - containerRect.top) - offset,
        behavior: "smooth",
    });
}

export default function ScrollToHash() {
    const { hash } = useLocation();

    useEffect(() => {
        if (!hash) return;

        const id = hash.slice(1);
        let attempts = 0;
        let frameId;

        const tryScroll = () => {
            const target = document.getElementById(id);
            const container = document.getElementById("content-scroll");

            if (target && container) {
                requestAnimationFrame(() => scrollToElement(container, target));
                return;
            }

            if (attempts++ < 20) {
                frameId = requestAnimationFrame(tryScroll);
            }
        };

        tryScroll();

        return () => cancelAnimationFrame(frameId);
    }, [hash]);

    return null;
}