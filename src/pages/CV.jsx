import pdf from "../assets/cv_apoh_aug2025.pdf";

function CV() {

  return (
    <section className="teaching">
      <h2>Curriculum Vitae</h2>
      <p class="contact-me">
        The best way to contact me is by email:{" "}
        <a href="mailto:apoh@umass.edu">apoh@umass.edu</a>
      </p>
      <iframe
        src={pdf}
        width="100%"
        height="1000px"
        style={{ border: 'none' }}
        title="CV"
      ></iframe>
    </section>
  );
}

export default CV;
