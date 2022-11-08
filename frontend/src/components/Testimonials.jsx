import "./testimonials.css";

const Testimonials = () => {
  return (
    // <div id="testimonial">
    <div class="container testimonial-container">
      <div class="row">
        <div class="col-md-12">
          <div class="section-title text-center">
            <h2>Happy Customer Says...</h2>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="ml-auto col-lg-3 col-md-3">
          <div class="testimony">
            <blockquote>
              &ldquo;If you’re looking for a top quality hotel look no further.
              We were upgraded free of charge to the Premium Suite, thanks so
              much&rdquo;
            </blockquote>
            <p class="author">
              <cite>Stephanie Miller</cite>
            </p>
          </div>
        </div>
        <div class="col-lg-3 col-md-3">
          <div class="testimony">
            <blockquote>
              &ldquo;Me and my wife had a delightful weekend get away here, the
              staff were so friendly and attentive. Highly Recommended&rdquo;
            </blockquote>
            <p class="author">
              <cite>John Smith</cite>
            </p>
          </div>
        </div>
        <div class="mr-auto col-lg-3 col-md-3">
          <div class="testimony">
            <blockquote>
              &ldquo;The hotel's restaurant, swimming pool, gym and bar is top
              notch. Amazing room and customer service. Definite
              recommend&rdquo;
            </blockquote>
            <p class="author">
              <cite>Jane Doe</cite>
            </p>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Testimonials;
