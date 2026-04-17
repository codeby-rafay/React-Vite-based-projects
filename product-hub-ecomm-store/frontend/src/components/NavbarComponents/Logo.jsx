import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div>
      <Link to="/" className="flex items-center gap-2">
        <div className="w-10 flex items-center justify-center">
          <span className="text-white font-bold text-sm">
            <img
              className="size-10 rounded-lg"
              src="https://media.licdn.com/dms/image/v2/D4E0BAQFq1CCkGzPR-w/company-logo_200_200/company-logo_200_200/0/1713840703024/product_hub_nyc_logo?e=2147483647&v=beta&t=hSAdtTSPN5ol9maUrYCrYLWfgfEvkPmHz90sKbUlKoI"
              alt="Logo"
            />
          </span>
        </div>
        <span
          className="text-xl font-bold text-gray-900"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Product<span className="text-orange-500">Hub</span>
        </span>
      </Link>
    </div>
  );
};

export default Logo;
