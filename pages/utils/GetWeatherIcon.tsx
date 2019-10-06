const GetWeatherIcon = (id, currentHour, sunrise, sunset): string => {
  const getSunrise: number = new Date(sunrise * 1000).getHours();
  const getSunset: number = new Date(sunset * 1000).getHours();
  switch (id > 0) {
    case id >= 200 && id <= 232:
      return '200-232.svg';
    case id >= 300 && id <= 321:
      return '300-321.svg';
    case id >= 500 && id <= 504:
      return '500-504.svg';
    case id === 511:
      return '511.svg';
    case id >= 520 && id <= 531:
      return '520-531.svg';
    case id >= 600 && id <= 622:
      return '600-622.svg';
    case id >= 701 && id <= 781:
      return '701-781.png';
    case id === 800 && currentHour >= getSunrise && currentHour < getSunset:
      return '800d.svg';
    case id === 800:
      return '800n.svg';
    case id === 801 && currentHour >= getSunrise && currentHour < getSunset:
      return '801d.svg';
    case id === 801:
      return '801n.svg';
    case id >= 802 && id <= 804:
      return '802-804.svg';
    default:
      return 'White.jpg';
  }
};

export default GetWeatherIcon;
