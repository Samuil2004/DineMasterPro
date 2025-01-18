function FooterLayout() {
  const isHomePage = location.pathname === "/";

  return (
    <footer
      className={`bg-white text-gray-600 p-5 ${
        isHomePage ? "mt-0 flex-grow" : "mt-4"
      }`}
    >
      <div className="mx-auto">
        <div className="flex flex-wrap sm:justify-between flex-col sm:flex-row">
          <div className="sm:flex-1 p-2 flex flex-col  text-center">
            <p>
              <strong>ADDRESS:</strong>
            </p>
            <p>Netherlands, Eindhoven 5611,</p>
            <p>Next to the Cathedral</p>
            <a
              href="https://www.google.com/maps/place/National+Palace+of+Culture+(NDK)/@42.6851491,23.3141399,17z/data=!3m1!4b1!4m6!3m5!1s0x40aa850fb6af8ebb:0x87a301b7860955b9!8m2!3d42.6851492!4d23.3190108!16zL20vMDloeHQy?entry=ttu&g_ep=EgoyMDI0MTAyNy4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mt-2 inline-block"
            >
              View on Google Maps
            </a>
          </div>
          <div className="sm:flex-1 p-2 flex flex-col  text-center">
            <p>
              <strong>WORKING HOURS:</strong>
            </p>
            <p>MONDAY-FRIDAY 1:00A.M. - 11:45P.M.</p>
            <p>SATURDAY/SUNDAY: 12:30A.M. - 12:00A.M.</p>
          </div>
          <div className="sm:flex-1 p-2 flex flex-col  text-center">
            <p>
              <strong>INFORMATION:</strong>
            </p>
            <p>GSM: +31 / 888-129837</p>
            <p>GSM: +31 / 886-917463</p>
            <p>GSM: +31 / 885-738575</p>
            <p>
              E-MAIL:
              <a className="text-blue-600" href="mailto:CANIM@Restaurant.COM">
                CANIM@RESTAURANT.COM
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterLayout;
