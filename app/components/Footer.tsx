const Footer = () => {
  return (
    <footer className="bg-background text-foreground py-6">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; {new Date().getFullYear()} LUXIMA Studio. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer

