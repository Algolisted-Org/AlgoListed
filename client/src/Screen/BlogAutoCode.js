import React, { useState } from 'react'
import styled from 'styled-components';

const BlogAutoCode = () => {
  const [para, setPara] = useState([]);
  const [currentClass, setCurrentClass] = useState("");
  const [showCodeFile, setShowCodeFile] = useState(false);
  const [lastClass, setLastClass] = useState("");
  
  const [dynamicChangerPara, setDynamicChangerPara] = useState(""); // ---> used as random temp

  const [fileName, setFileName] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorLinkedIn, setAuthorLinkedIn] = useState("");
  const [date, setDate] = useState("");
  const [readingTime, setReadingTime] = useState("");
  const [authorImage, setAuthorImage] = useState("");
  const [headerImage, setHeaderImage] = useState("");
  const [articleTopic, setArticleTopic] = useState("");
  const [socialPreview, setSocialPreview] = useState("");

  console.log(para.length);

  // setTheArray([...theArray, newElement]);

  const handleTempEntry = (e) => {
    setPara([...para, [dynamicChangerPara, currentClass]]);
    setDynamicChangerPara("");
    setLastClass(currentClass);
  }

  return (
    <Container>
      <div className="navbar">
        <div className="logo">
          <img src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/dahhmxmsjdkqd2tq9c79" alt="" />
          <div className="text">Algorithmist Blog Automation Tool</div>
        </div>
        <div className="links">
          <a href="/" className="link">Blog Automation</a>
        </div>
      </div>

      <div style={{marginBottom: "15px"}} className='small-desc'>Static Data Here - Those data which are comming finite number of times.</div>      
      <input type="text" name="" id="" placeholder='Blog Title' value={fileName} onChange={(e) => setFileName(e.target.value)}/>
      <input type="text" name="" id="" placeholder='Blog Support' value={title} onChange={(e) => setTitle(e.target.value)}/>
      <input type="text" name="" id="" placeholder='Blog Intro' value={subTitle} onChange={(e) => setSubTitle(e.target.value)}/>

      <input type="text" name="" id="" placeholder='Author name' value={authorName} onChange={(e) => setAuthorName(e.target.value)}/>
      <input type="text" name="" id="" placeholder='Author LinkedIn link (If available)' value={authorLinkedIn} onChange={(e) => setAuthorLinkedIn(e.target.value)}/>
      <input type="text" name="" id="" placeholder='Author Github link (If available)' value={authorLinkedIn} onChange={(e) => setAuthorLinkedIn(e.target.value)}/>
      <input type="text" name="" id="" placeholder='Date in DD MM YYYY format' value={date} onChange={(e) => setDate(e.target.value)}/>
      
      <br />
      <div className="btn-collection">
        <button onClick={() => setCurrentClass("Subheading")}>Bullet Point</button>
        <button onClick={() => setCurrentClass("Subheading")}>Sub Heading</button>
        <button onClick={() => setCurrentClass("Subheading")}>Subheading Text</button>
        <button onClick={() => setCurrentClass("Subheading")}>Subheading With Topic Text</button>
        <button onClick={() => setCurrentClass("Paragraph")}>Small Width Image</button>
        <button onClick={() => setCurrentClass("Paragraph")}>Full Width Image</button>
        <button onClick={() => setCurrentClass("Image")}>Video Element</button>
      </div> 
      
      <div className='small-desc'>You are entering {currentClass.length > 1 ? currentClass : "? - Please press a button from above. "}</div>
      <input type="text" name="" id="" placeholder='Enter Here . . .' value={dynamicChangerPara} onChange={(e) => setDynamicChangerPara(e.target.value)}/>
      <button className='btn-1' onClick={handleTempEntry}>Temp Done</button> <br />

      <button className='btn-2' onClick={() => alert("This feature will be added soon - Developer")}>Preview Blog</button>
      <button className='btn-2' onClick={() => alert("This feature will be added soon, try viewing the code and copying it manually. - Developer")}>Copy Code</button>
      <button className='btn-2' onClick={() => setShowCodeFile(!showCodeFile)}>
        {
          showCodeFile ? "Hide raw HTML Code" : "Show raw HTML Code"
        }
      </button>
      <a href='https://github.com/Nayaker/Algorithmist/issues' target="_blank" className='btn-2' rel="noreferrer">Report an Issue</a>

      {
        showCodeFile ? (
          <div>
            <p className='text-page'>
              {
                `
                  <!DOCTYPE html>
                  <html lang="en">
                  <head>
                    <!-- Global site tag (gtag.js) - Google Analytics -->
                    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-215169475-1"></script>
                    <script>
                      window.dataLayer = window.dataLayer || [];
                      function gtag() { dataLayer.push(arguments); }
                      gtag('js', new Date());
                      gtag('config', 'UA-215169475-1');
                    </script>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                    <meta name="description" content="${subTitle}" />
                    <meta name="keywords" content="Jadavpur University, Finance Club, Finance, JU, Club, FinClub, stock market, financial markets, investing, trading, equity, equities, derivative, derivatives, futures, options, commodity, analysis, research, educational" />
                    <meta name="author" content="Jadavpur University Finance Club" />
                    <title>${title}</title>
                    <link rel="canonical" href="https://finclubju.com/" />
                    <link rel="icon" type="image/x-icon" href="../assets/favicon.ico" />
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
                    <link href="../css/styles.css" rel="stylesheet" />
                    <meta property="og:locale" content="en_US" />
                    <meta property="og:type" content="article" />
                    <meta property="og:title" content="${title}" />
                    <meta property="og:description" content="${subTitle}" />
                    <meta property="og:url" content="https://finclubju.com/" />
                    <meta property="og:site_name" content="FinClub JU" />
                    <meta property="og:image" content="https://finclubju.com/assets/social/img/s-img-${socialPreview}.jpg" />
                    <meta property="og:image:alt" content="" />
                    <meta property="article:publisher" content="https://www.facebook.com/FinClubJU" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:site" content="@FinClubJU">
                    <meta name="twitter:title" content="${title}">
                    <meta name="twitter:description" content="${subTitle}">
                    <meta name="twitter:image" content="https://finclubju.com/assets/social/img/s-img-${socialPreview}.jpg">
                  </head>

                  <body class="d-flex flex-column">
                    <main class="flex-shrink-0">
                      <nav class="navbar navbar-expand-lg navbar-dark "
                        style="top:24px; width:100%; height:40px; position:fixed; background-color:#2f333d; z-index:1200;">
                        <div class="container px-5" style="background-color:#2f333d; height:40px; z-index:1200; ">
                          <a href="../index.html"><img src="../assets/sitelogo2.jpg" height="36px" width="36px"></a>
                          <a class="navbar-brand" href="../index.html"><b>FinClub JU</b></a>
                          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
                            style="background-color:#0252c9;"><span class="navbar-toggler-icon"></span></button>
                          <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav ms-auto mb-2 mb-lg-0" style="background-color:#2f333d; ">
                              <li class="nav-item ms-2 me-2"><a class="nav-link" href="../index.html" style="color:white;">Home</a></li>
                              <li class="nav-item ms-2 me-2"><a class="nav-link" href="../blog.html" style="color:white;">Blog</a></li>
                              <li class="nav-item ms-2 me-2 dropdown">
                                <a class="nav-link dropdown-toggle" id="navbarDropdownBlog" href="#" role="button"
                                  data-bs-toggle="dropdown" aria-expanded="false" style="color:white;">About</a>
                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownBlog">
                                  <li><a class="dropdown-item" href="../about.html" style="z-index:200;">About FinClub</a></li>
                                  <li><a class="dropdown-item" href="../about.html#our-partners" style="z-index:200;">Our Partners</a>
                                  </li>
                                  <li><a class="dropdown-item" href="../about.html#membership" style="z-index:200;">Membership</a></li>
                                  <li><a class="dropdown-item" href="../about.html#the-team" style="z-index:200;">The Team</a></li>
                                  <li><a class="dropdown-item" href="../about.html#contact" style="z-index:200;">Contact</a></li>
                                  <li><a class="dropdown-item" href="../about.html#faqs" style="z-index:200;">FAQs</a></li>
                                </ul>
                              </li>
                              <li class="nav-item ms-2 me-2 dropdown">
                                <a class="nav-link dropdown-toggle" id="navbarDropdownBlog" href="#" role="button"
                                  data-bs-toggle="dropdown" aria-expanded="false" style="color:white;">Work</a>
                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownBlog">
                                  <li><a class="dropdown-item" href="../finlearn.html" style="z-index:200;">FinLearn Collection</a></li>
                                  <li><a class="dropdown-item" href="../awareness.html" style="z-index:200;">Financial Awareness</a></li>
                                  <li><a class="dropdown-item" href="../consulting.html" style="z-index:200;">Consulting Wing</a></li>
                                  <li><a class="dropdown-item" href="../shop.html" style="z-index:200;">Merch Shop</a></li>
                                </ul>
                              </li>
                              <li class="nav-item ms-2 me-2 dropdown">
                                <a class="nav-link dropdown-toggle" id="navbarDropdownPortfolio" href="#" role="button"
                                  data-bs-toggle="dropdown" aria-expanded="false" style="color:white;">Events</a>
                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownPortfolio">
                                  <li><a class="dropdown-item" href="../events.html" style="z-index:200;">View Events</a></li>
                                  <li><a class="dropdown-item" href="../events.html#roundtable" style="z-index:200;">Roundtable</a></li>
                                  <li><a class="dropdown-item" href="../events.html#hackathons" style="z-index:200;">Hackathons</a></li>
                                  <li><a class="dropdown-item" href="../events.html#interviews" style="z-index:200;">Interviews</a></li>
                                  <li><a class="dropdown-item" href="../events.html#workshops" style="z-index:200;">Workshops</a></li>
                                  <li><a class="dropdown-item" href="../events.html#seminars" style="z-index:200;">Seminars</a></li>
                                  <li><a class="dropdown-item" href="../events.html#mockstock" style="z-index:200;">MockStock</a></li>
                                  <li><a class="dropdown-item" href="../events.html#finquiz" style="z-index:200;">FinQuiz</a></li>
                                  <li><a class="dropdown-item" href="../events.html#fincon" style="z-index:200;">FINCON</a></li>
                                </ul>
                              </li>
                              <li class="nav-item ms-2 me-2 dropdown">
                                <a class="nav-link dropdown-toggle" id="navbarDropdownBlog" href="#" role="button"
                                  data-bs-toggle="dropdown" aria-expanded="false" style="color:white;">Publications</a>
                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownBlog">
                                  <li><a class="dropdown-item" href="../newsletter.html" style="z-index:200;">Newsletter</a></li>
                                  <li><a class="dropdown-item" href="../fcj.html" style="z-index:200;">FinClubJournal</a></li>
                                </ul>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </nav>
                      <div class="tradingview-widget-container" style="top:-10px; position:fixed; background-color:black; z-index:199;">
                        <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
                          async>
                            {
                              "symbols": [{ "description": "SENSEX", "proName": "BSE:SENSEX" },
                              { "description": "SMLCAP", "proName": "BSE:SMLCAP" },
                              { "description": "MIDCAP", "proName": "BSE:MIDCAP" },
                              { "description": "METAL", "proName": "BSE:METAL" },
                              { "description": "POWER", "proName": "BSE:POWER" },
                              { "description": "OILGAS", "proName": "BSE:OILGAS" },
                              { "description": "IT", "proName": "BSE:IT" },
                              { "description": "FMCG", "proName": "BSE:FMCG" },
                              { "description": "BANK", "proName": "BSE:BANK" },
                              { "description": "HC", "proName": "BSE:HC" },
                              { "description": "TELCOM", "proName": "BSE:TELCOM" },
                              { "description": "CG", "proName": "BSE:CG" },
                              { "description": "PSU", "proName": "BSE:PSU" },
                              { "description": "AUTO", "proName": "BSE:AUTO" },
                              { "description": "IPO", "proName": "BSE:IPO" },
                              { "description": "REALTY", "proName": "BSE:REALTY" }],
                                "showSymbolLogo": false, "colorTheme": "dark", "isTransparent": true, "displayMode": "regular", "locale": "in"
                            }
                          </script>
                      </div>
                      <section class="py-5">
                        <div style="height:40px;"></div>
                        <div class="container px-5 my-5">
                          <div class="row gx-5">
                            <div class="col-lg-3">
                              <div class="d-flex align-items-start mt-lg-5 mb-4">
                                <img class="img-fluid rounded-circle" height="50px" width="50px"
                                  src="https://finclubju.com/assets/profile/authors/p-img-${authorImage}.jpg" alt="..." />
                                <div class="ms-3">
                                  <div class="fw-bold">${authorName}</div>
                                  <div class="text-muted">${date} &middot; ${readingTime} min read</div>
                                  <div style="height:10px;"></div>
                                  <div class="text-left"><a class="fs-5 link-dark"
                                      href="${authorLinkedIn}" target="_blank"><i
                                        class="bi-linkedin" style="font-size:28px; color:#005ac2;"></i></a></div>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-9">
                              <article>
                                <header class="mb-4">
                                  <h1 class="fw-bolder mb-1">${title}</h1>
                                  <div style="height:12px;"></div>
                                  <div class="text-muted fst-normal fs-5 mb-2" style="text-align: justify; text-justify: inter-word;">
                                    ${subTitle}
                                  </div>
                                  <div style="height:12px;"></div>
                                  <a class="badge bg-primary text-decoration-none link-light" style="font-size:14px;"
                                    href="../blog.html">Finance Blog</a>
                                  <a class="badge text-decoration-none link-light" style="font-size:14px;background-color:#cc0000;"
                                    href="#!">${articleTopic}</a>
                                </header>
                                <figure class="mb-4"><img class="img-fluid rounded" src="https://finclubju.com/assets/blog/h-img-${headerImage}.jpg" alt="..." /></figure>
                                <section class="mb-5">
                                  <div style="height:12px;"></div>
                `
              }
              
              
              
              

              {
                  para.map((item) => (
                      item[1] == "Image" ?(
                        `<img src="${item[0]}" height="36px" width="36px">`
                      ):(
                        item[1] == "Subheading" ? (
                          `<h1 class="fw-bolder mb-4 mt-5">${item[0]}</h1>`
                        ):(
                          `<p class="fs-5 mb-4" style="text-align: justify; text-justify: inter-word;">${item[0]}</p>`
                        )
                      )
                  ))
              }
              
              
              
              
              {
                `
                              </section>
                            </article>
                            </div>
                          </div>
                        </div>
                        </div>
                      </section>
                    </main>
                    <footer class="bg-dark py-4 mt-auto">
                      <div class="container px-5">
                        <div class="row align-items-center justify-content-between flex-column flex-sm-row">
                          <div class="col-auto">
                            <div class="text-center">
                              <a class="fs-5 px-2 link-dark" href="https://www.twitter.com/finclubju" target="_blank"><i
                                  class="bi-twitter" style="font-size:20px; color:#eeeeee;"></i></a>
                              <a class="fs-5 px-2 link-dark" href="https://www.linkedin.com/company/finclubju" target="_blank"><i
                                  class="bi-linkedin" style="font-size:20px; color:#eeeeee;"></i></a>
                              <a class="fs-5 px-2 link-dark" href="https://www.facebook.com/finclubju" target="_blank"><i
                                  class="bi-facebook" style="font-size:20px; color:#eeeeee;"></i></a>
                              <a class="fs-5 px-2 link-dark" href="https://www.instagram.com/finclubju" target="_blank"><i
                                  class="bi-instagram" style="font-size:20px; color:#eeeeee;"></i></a>
                            </div>
                          </div>
                          <div class="col-auto">
                            <div class="small m-0 text-white" style="text-align: center;">Copyright &copy; FinClub JU. Website designed by
                              <a href="https://www.linkedin.com/in/realspal" target="_blank"><b><i>realspal</i></b></a>.</div>
                          </div>
                          <div class="col-auto">
                            <a class="link-light small" href="../privacy.html" style="color:white;">Privacy</a>
                            <span class="text-white mx-1">&middot;</span>
                            <a class="link-light small" href="../terms.html" style="color:white;">Terms</a>
                            <span class="text-white mx-1">&middot;</span>
                            <a class="link-light small" href="../contact.html" style="color:white;">Contact</a>
                          </div>
                        </div>
                      </div>
                    </footer>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
                    <script src="js/scripts.js"></script>
                  </body>

                  </html>
                `
              }
            </p>
          </div>
        ) : (
          <></>
        )
      }

      {
        para.length > 0 ? (
          <PopUp>
              Last Temp Action : {lastClass} was added on the HTML code. 
          </PopUp>
        ):(
          <></>
        )
      }

      {/* <Footer>
        <a href='https://finclubju.com/' target="_blank" className="item1">Visit Main Website | FinClub JU</a>
        <a href='https://www.linkedin.com/in/atanu-nayak-profile/' target="_blank" className="item2">Automation Tool Developed by <b>Atanu Nayak</b></a>
        <div className="item3">
          <img src="https://cdn.iconscout.com/icon/free/png-256/github-3089487-2567439.png" alt="" />
        </div>
      </Footer> */}
    </Container>
  )
}

export default BlogAutoCode

const Container = styled.div`
    padding: 30px;
    position: relative;
    background-color: #fefdff;
    padding: 80px 30px 30px 30px;
    
    .navbar{
      height: 60px;
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      background-color: #fff;
      border-bottom: 1px solid rgba(230,230,230,1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 30px;

      .logo{
        display: flex;
        align-items: center;
        
        img{
          height: 27.5px;
          margin-right: 5px;
        }

        .text{
          font-size: 0.9rem;
          font-weight: 600;
        }
      }

      .links{
        a{
          font-size: 0.8rem;
          color: white;
          padding: 5px 20px;
          background-color: #3c3d48;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 200;
        }
      }
    }

    input{
      font-size: 0.85rem;
      padding: 10px 20px;
      width: 80%;
      display: block;
      outline: none;
      font-weight: 500;
      margin-bottom: 15px;
      border-radius: 5px;

      display: block;
      appearance: none;
      outline: none;

      /* background-color: #f3eeee; */

      border: 1px solid #f3eeee;
      box-shadow: rgb(28 28 28 / 8%) 0px 2px 8px;


      &:hover{
          /* border: 1px solid grey; */
      }

      &:focus::placeholder{
          color: transparent;
      }

      &::placeholder{
          transition: color 350ms ease;
          /* color: transparent; */
      }
  
      &:focus{
          transition-duration: 350ms;
          border: 1px solid #d1c1c1;
          background-color: #fbfbfb6e;
      }
    }

    .btn-1{
      padding: 10px;
      cursor: pointer;
      font-size: 0.7rem;
      font-weight: 600;
      margin: 2.5px 0 100px 0;
      background-color: grey;
      border: 1px solid #f3eeee;
      background-color: #fbfbfb6e;
      box-shadow: rgb(28 28 28 / 8%) 0px 2px 8px;

      &:hover{
        transition-duration: 350ms;
        border: 1px solid #d1c1c1;
        border-radius: 5px;
      }
    } 

    .btn-2{
      padding: 5px 15px;
      cursor: pointer;
      font-size: 0.8rem;
      font-weight: 600;
      margin: 0px 5px 15px 0;
      border: none;
      background-color: #e9eaeb;
      border-radius: 3px;
      text-decoration: none;
    }

    .text-page{
      width: 80%;
      padding: 15px;
      background-color: #3a3838;
      border: 1px solid black;
      font-size: 0.8rem;
      font-weight: 200;
      color: white;
      border-radius: 5px;
    }

    .btn-collection{
      display: flex;
      align-items: center;
      margin: 10px 0 20px 0;

      button{
        background-color: #222222;
        cursor: pointer;
        border: 1px solid transparent;
        border-radius: 4px; 
        margin-right: 4px;
        padding: 5px 10px;
        font-size: 0.7rem;
        color: white;
        /* border: 1px solid #f3eeee; */
        box-shadow: #1c1c1c5c 0px 2px 8px; 

        &:hover{
          box-shadow: rgb(28 28 28 / 8%) 0px 2px 8px; 
          transition-duration: 500ms;
        }
      }
    }

    .small-desc{
      font-size: 0.7rem;
      margin: 5px 0;
    }
`

const Footer = styled.div`  
  height: 60px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  background-color: #252527;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 30px;

  a{
    text-decoration: none;
    color: #aaa0a0;
    font-size: 0.8rem;
  }

  .item1{
    width: 33.33vw;
    display: flex;
    justify-content: flex-start;

  }

  .item2{
    width: 33.33vw;
    display: flex;
    justify-content: center;

    b{
      color: #d8d3d3;
      margin-left: 4px;
    }
  }

  .item3{
    width: 33.33vw;
    display: flex;
    justify-content: flex-end;

    img{
      height: 30px;
    }
  }
`

const PopUp = styled.div`
  position: fixed;
  width: 240px;
  right: 10px;
  bottom: 70px;
  font-size: 0.75rem;
  font-weight: 200;
  background-color: #252527;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
`