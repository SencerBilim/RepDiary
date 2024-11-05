const Footer = () => {
    const currentYear = new Date().getFullYear();
  
  
    return (
        <footer className="footer">  © {currentYear} by SencerBilim </footer>
    )
}

export default Footer;