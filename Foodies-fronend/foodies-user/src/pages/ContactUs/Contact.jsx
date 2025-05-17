import React from 'react'

const Contact = () => {
  return (
    <section className="d-flex align-items-center" style={{minHeight:"80vh"}}>
      <div className="container card col-10 col-md-6  bg-body-secondary">
          <div className="row justify-content-center">
              <div className="col-lg-10">
                  <div className="contact-form p-3">
                      <h2 className="text-center mb-4 text-decoration-underline">Get in Touch</h2>
                      <form className=''>
                          <div className="row g-3">
                              <div className="col-md-6">
                                  <input type="text" className="form-control custom-input" placeholder="First Name"/>
                              </div>
                              <div className="col-md-6">
                                  <input type="text" className="form-control custom-input" placeholder="Last Name"/>
                              </div>
                              <div className="col-12">
                                  <input type="email" className="form-control custom-input" placeholder="Email Address"/>
                              </div>
                              <div className="col-12">
                                  <textarea className="form-control custom-input" rows="5" placeholder="Your Message"></textarea>
                              </div>
                              <div className="col-12">
                                  <button className="btn btn-dark w-100 py-2" type="submit">Send Message</button>
                              </div>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
    </section>  
  )
}

export default Contact;