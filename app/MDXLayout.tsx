export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <div
      className="w-full prose text-black dark:text-white 
        prose-headings:mt-8 prose-headings:font-semibold 
        prose-h1:text-5xl prose-h1:font-medium 
        prose-h2:text-4xl prose-h2:font-mdeium
        prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg"
    >
      {children}
    </div>
  );
}
