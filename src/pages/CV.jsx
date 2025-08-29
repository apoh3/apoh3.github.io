function CV() {
  const pdfUrl = `${import.meta.env.BASE_URL}docs/cv_apoh_aug2025.pdf`; // adjust path if needed

  return (
    <section className="teaching">
      <h2>Curriculum Vitae</h2>
      <p class="contact-me">
        The best way to contact me is by email:{" "}
        <a href="mailto:apoh@umass.edu">apoh@umass.edu</a>
      </p>
      <iframe
        src={pdfUrl}
        width="100%"
        height="1000px"
        style={{ border: 'none' }}
        title="CV"
      ></iframe>
    </section>
  );
}

export default CV;
