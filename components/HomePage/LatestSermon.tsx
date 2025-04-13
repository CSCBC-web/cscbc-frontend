import { title, subtitle } from "@/components/primitives";

export default function LatestSermon() {
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-4xl h-[50vh] flex flex-col text-center justify-center align-items-center">
                <span className={title()}>Latest Sermon</span>

            </div>
        </section>
    );
}