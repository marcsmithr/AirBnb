import './Footer.css'


export const Footer = () => {


    return (
        <div className='footer-container'>
            <div className='footer-header'>
                <span>
                    Socials:
                </span>
            </div>
            <div className='footer-socials'>
                <div className='footer-socials-container'>
                    <a href='https://www.linkedin.com/in/marc-smith-240720224/' target='_blank'>
                        <i class="fa-brands fa-linkedin"></i>
                            Linkedin
                    </a>
                </div>
                <div className='footer-socials-container'>
                    <a href='https://wellfound.com/u/marc-smith-24' target="_blank">
                    <i class="fa-brands fa-angellist"></i>
                        Angellist
                    </a>
                </div>
                <div className='footer-socials-container'>
                    <a href='https://github.com/marcsmithr' target='_blank'>
                    <i class="fa-brands fa-github"></i>
                        Git
                    </a>
                </div>
            </div>
            <div className='footer-header'>
                <span>
                    Technologies Used:
                </span>
            </div>
            <div className='code-languages-container'>
                <div>
                    <span>
                    <i class="devicon-javascript-plain"></i>
                         JavaScript
                    </span>
                </div>
                <div>
                    <span>
                    <i class="devicon-nodejs-plain"></i>
                        Node
                    </span>
                </div>
                <div>
                    <span>
                    <i class="devicon-git-plain"></i>
                        Git
                    </span>
                </div>
                    <span>
                    <i class="devicon-html5-plain"></i>
                        HTML
                    </span>
                <div>
                    <span>
                    <i class="devicon-css3-plain-wordmark"></i>
                        CSS
                    </span>
                </div>
                <div>
                    <span>
                    <i class="devicon-express-original"></i>
                        Express
                    </span>
                </div>
                    <span>
                    <i class="devicon-sqlite-plain"></i>
                        SQL
                    </span>
                <div>
                    <span>
                    <i class="devicon-react-original"></i>
                        React
                    </span>
                </div>
                <div>
                    <span>
                    <i class="devicon-redux-original"></i>
                        Redux
                    </span>
                </div>
            </div>
            <div className='my-information'>

            </div>

        </div>
    )
}

export default Footer
