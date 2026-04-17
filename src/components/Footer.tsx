interface FooterProps {
  hasNavigation: boolean
}

export default function Footer({ hasNavigation }: FooterProps) {
  const className = hasNavigation ? 'app-footer app-footer--with-nav' : 'app-footer'

  return (
    <footer className={className}>
      © Anton Sizikov — Solutions Engineer @ GitHub
    </footer>
  )
}
