import ChatWidget from "@/components/ChatWidget"

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <ChatWidget />
    </>
  )
}
