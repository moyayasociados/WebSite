type Props = { title: string; description?: string; dark?: boolean; };
export function SectionHeading({ title, description, dark=false }: Props) {
  return <div className="mx-auto mb-14 max-w-2xl text-center">
    <h2 className={`font-display text-3xl font-bold md:text-4xl ${dark ? "text-white" : "text-primary"}`}>{title}</h2>
    {description && <p className={`mt-4 leading-7 ${dark ? "text-white/65" : "text-muted"}`}>{description}</p>}
  </div>;
}
