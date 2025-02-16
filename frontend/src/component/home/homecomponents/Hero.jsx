
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Hero = () => {
  return (
    <section className="w-full px-8 py-10 grid grid-cols-1 md:grid-cols-2  gap-8 max-w-6xl mx-auto">
      <div className="mt-11">
        {/* <span className="block mb-4 text-xl md:text-xl text-indigo-500 font-medium">
        </span> */}
        <h3 className="text-3xl md:text-4xl font-semibold text-orange-500 ">
        Welcome to TravelSathi: Discover Together - Your Guide to Adventure!
        </h3>
        <p className="text-base md:text-lg text-slate-500 my-4 md:my-6">
        Connect with travelmates and experience Nepal like never before.
        </p>
        <button className="bg-gradient-to-r from-orange-500 to-indigo-500 text-white font-medium py-2 px-4 rounded transition-all">
  Get Started
</button>

      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISERASEBMVFRUVGBUWFRYWFhUWFRUVFxUXFxUVFRYYHSggGBolGxUVITEhJSkrLi8uFx8zODMsNygtLisBCgoKDg0OGxAQGy0lICUtLS0vLS0vLS0vLy0tLSstLS0tLS0tLS0tLy0tLS0tLS0tLS0tKy0tLS0tLS0tLS0tLf/AABEIAJEBXAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAACAAEDBAUGBwj/xABBEAABAwIEAwUFBQYFBAMAAAABAAIRAyEEEjFBBVFhBhMicYEykaGxwRRCUtHwByMzcrLhNENigrNzg8LxFZLD/8QAGgEAAwEBAQEAAAAAAAAAAAAAAAECAwQFBv/EACsRAAICAQQABgICAgMAAAAAAAABAhEDBBIhMQUTIjJBUWFxFIGh8BWRwf/aAAwDAQACEQMRAD8A45JFCUL6I+VBSRQlCABSRQlCAGSTwlCQDJJ4SQFjJQiSQKxkyKEoQFgwnhPCeEwsGEoRQlCAsGE6KEoQKwUoRQnhAWBCeEUJwECsGEoRQlCAsGE8IoShArBhOihKEBYMJ4RAJQmKxoTwnhPCBWCnhOAnAQKwYTgIgE4CBAgJ4RQnhMAYTgIgEQCAoCE+VSBqMNSspRMqEoRwlCC7AhKEcJoSCwYShFCUICwYShFCUICwYTwnhPCAsGEoRQlCAsaEoRQkgVgwlCKEoQFjQlCKEoQFgwlCKE8IFYMJQihKEwsGE8IoShArBhPCdPCAsGE8IoShArBhKEUJ4QFgwnhFCUJisaE8J4TwgVgwnhEGog1IYAaiDUYYiDUWUokQajDVIGog1KylEiDEQapQ1PlSspRIw1GGow1OlY6MaEoRwlC0MrAhKEcJQkFgQlCOE0ICwYShFCeEBYCeEUJQgLBhKEUJQgLBhJHCUIFYMJQihW+F8Lq4ioKdFuZ0SdAAJALnE2AuPek2krY0nJ0ilCeF6HwDsHk8eLAfLTFMEwHTHjIid9PNWuC9h2U8QajnZmDxU2EXH4c86kek6rmlrMas7o+HZpVaq/8AB5lCeF7rxDhdDE0hSxDQ5rTLdnN0mHC+/kd9l51x7sJWovBpfvabycpAMt5CpsLb9Dolh1kJ8PhhqPD8mPmPKOPhLKvSOFdi6WUd6ATvcwjPYOlmBaXEXlp06XF0fzMdh/xuar4PNcqWVd3x7sQ+c9BoAy+yPxDYTpKwz2SxYYXmnETIkZrdFrDUY5K7MMmjzQdbb/RgQnhT1cO5ph7SDyIhD3a2tHM0yOEoUuRIMQLkihPlUwYiFNFj2sgDU+VT5EWRKx7CuGog1ThicMRZSgQhqINUwposimy1AiDU4arWHaAQSJj3KzXNMnMGROo29FLlyaxx2rsz2snRPkV0FojK2/Mk/JFUqudcpbmV5a+ykGp8isBiWRFhsIA1PkVjInyIsNpz0JQjypQtzhsCEoRwmhAWDCUI8qaEBYMJQjypZUCsCE+Q6wpqdMwbT1WzgcPnHdkg2nyWc5qJviwvI6MHu7SmyFauKwuTLOn0UtA0xOZth6fAJeZxaL8jmm6MWEoVquS5xNhyA0Qd2tEzna54LvZ7gj8XWFJhDbFznG4a0bxuZIEdV6fwHhVHB5WN1IMuMZnklsz5EAAbT1XP/s/4XUa19cwGPhg1kQTJJHs39/Te/wBpOImkXMpuzvIJNy7u7fhiJOw21jn5WqyyyT2J8Hv6HBHFjWSS5Zp8ax/geKb4IOUGTdwLiRtNo90K5SqhwZUaJzATEnWNl59xHEMFOnTqAl0AwT+8zS0P9nqHEF2sx1UQ4hUNVo7xzA0FpBJaQC5xNMZdYBb/AGgRz+VaO3zeT0ipispA180FTE+EAHrE6eaz8BTJY3LJbAAJ5LQp4LVZUkacsVGpAUza0bXVcUXgkD3qzSwmhOqGNFhtadlLTpgoG01LTspGcb294GHhtVvtCGwBMydzsFzXDOzTqzXAWe1wBBtDT+ivVazQdUFCk1pJA11K6YamUYbUcmTRwnPezz7tH2RbSotfRBJaQHC5JB3jzXMUeG1HTkpudYmzSbDX5he3loKhfg2wcoAnkrx6yUVT5M8vh8JytcHiIo620R08K505WkxcwCYHWNF6ng+zFKmXmMxcSbxboFc4ZwalQBFNsSZM3J962lrl8I54+Gv5Z5xg+ydeq3M0CLamLnUDmQs3iPDnUahY4gkRp12PVe0gga2WFj+z1CtVFV0k7ttDuhUQ1rv1dGuTw6O30dnljaS1eC8EdWqhjpYNzHIiQOt16VhsBSpwGU2tjkBv11VlrRKJ61v2oMfhyTuTORf+z7XLW8pb/dZmM7G16ckQ5oEki2mogr0ubISzMCDdYLV5F2zolosL6R5dgMK0gAU3P56COul1axHAmiD4/KJXY4jB+JxvA2CysRSMiHBo/XNaee27RH8aKVPkwDwIESM3uVerwgj7zfefyXSPqFos4fRZuNxN739T8lpHJNmc8ONLowHYcjZD3a2C9hMlpPmVWrkOM290LdTZyyxpdMoZEQYeS1MBwp9U+GANyfOLDdb/AA/DPpsyNdEEzDQb73tOyjJnUTTFpnPl9HlmRLIrPdp+7XfuPG2FTKllVvIm7tG4XllbIkGK1kS7tLcPYVsicMVnu07KRJhoJPICT7kbh+WV2gqelUc0ggwrzuEVW5c4DS7RriA71G3qrOD7P1nkSAwHQuNj5RM6rF5sf2jqjpsyqkylUrlwHxlXMNwevVYajKZLLiTvzIGrh5AqfB8HeK9OlWYcpfB/C6ASYdvYEnkOSl7e9t3YKlhxw9zKnfDM1wh4p0hIBFPm4yATYd263Lmy59rUYHdg0zmnLJaD4Z2OzlpqVWwQTlZOafui4EA7mP7dXheHUwKeagyKbg7KBIHJ4tY6E3vBmVm9isc/F0Q/EGk+pE5mEMgZi0g5HFpIy621EAwtjEcOa32HvDwBEkeEZs08jefeuLJnlN8v/o9DFpYYlSj39j8Lx2SriWGIbUfYANa1kNI28RJLrrjMdj6RxJdTLgT4W92M5c98te5odsQ4gH4LthWDwQ7wtdTPe1SMnhh7XOEi3sg30kLAwPCWsbWDHHNTkyRkGUZiN/8AVz6JQaVlTTdFXg3ZumX1XVGuJcSAXQINiSI3n8tlpjsthw9ri32YDQCQAAZ0Gtybqzha4ZGdwkwQDAidLc1ddVlDlKxqEaLNGIAVukQstrlYpvWbLRfLAjCpCoUYKRRbCYlQFyTKiAJgpGtUTXIs6QEmVCHQg71QuqygC010oiqTaplE6vNkwDqiVE1sIu8T50AERIUREIw9EboAKnUBspcqpOHJT0q/NACrtssfH4Mm7QOslbkqGqE4toUlZxmMovEB1vIEx15K/hKIbSJyDNP3mybHUk6jSwt0WvWpB1jdG2iAFq8tqjJYknZlgNLWd3SaA6cxAAvE+z5hwVeg2oWZAJN9RAAnw23K32NATPIU7ythkfYnZYM5xEOsI0JFv1orFTBNcZdc+qsVCojVStjpHlORM+BqYUDOLUj3hBnJHQO8pWbjuIsqMIeIgi2sjXVd2bXQgvSzycHh85P1qkbNO4BGhRZFl4avUrmkxnhaSQeoHlMXA966DC4dxq06QYXF0xExDdS47ba80oa+D7KyeGSXKf8ARFhsLmNlo0OFl4MCCOYjzjouuwPA2BvsgW2T4nDtw9NzrkdeXzSnqr9prj0KivUYPDuD02D94zO7QzIa2WyIiZ2uY1WjhajcjA0tbqT4BpFoj1vvbmpaeKY+QHXJmJHoDFrfmosZg3NY4tFzcxa/MxyHyXNKcpP1M64Y4wXpRjcRDTUg+KC4OdpDgRYDfqD1Whh5c5zbS0m8x4CQR4TyPIfessRmGdUe0gOG5kERvM9bm06rU4HVa6pkewTo0eKMp2jkh9DXZ5v2/wC0z6mLfRzlrKZytAEEl4Be5xGogwADG+6y8NXo0mHK0OLgXF7hJJ3Omt9tOiqftJrB/E8Xk9lj+7AG3dgMIA5Zmu96pcFxAc7uqxcaJc3M9oDnt/CQ15g6GyMM4wbbHqYTyKMVwl9cf2/yezfsi4S1mHqVKYaKpqEPfcnLGZrTeIGfYepXpGFw7sga5wJveJsdhPovF/2XdoRhq7adasO5rNDI0a2qCA0vBJg2ILhEzcWXt1NonwuM/CFOaG2QsGTfH8rg47tlxVzHtwwb4JYXuOaTeQ0EHSwWHguIPq1a3ekNp+AhsR4hLaTTFzqbfkvSOKUW904uLA4NOV7rZXQcpBuRBvbkvPcLwd7qoaHS/LEhsENEAGSNI312N1cHHaTOMtxTw7nVaj7PglxzWBDcwhxAJDdIy9F1VENotDC6XBuaJlwadyNQtPAcMp4em1sAPMnMRJzkEkxv8FjuwILz3bjVc901KjspNwIa3K3XwkxsAbgKZTTLjBouU68mx+qttqriOJYY06kipUe0tPizHKajTHgaIkAh2s6LVwGKaKdEh01C0y2/iMvBz5vZEscZ2A8lDLR0ZxQG6Gnj2kwCJXCcZ4s/vGikdAZ+Gk3P9wqQ4m7M15MOsD1Okxa35pNFI9O+1BStqrzU9oajfEDItYb/AK+i2KPaoBjXlroOpFwPUdUqYHcMqJPrLiqXa9jjABQU+0dUlxDQ5oBcQNQG6lFMLO0NVOHLl+G9qKT4DvCT7v7LXONadCEAXqlWFXOIVN2LBMSE9uaBFxlZTiqqFMjmrdOEAWGKUKGmVMCgYQagqABJzkBcgAmuSe4woiVKw7IAFjTIUtRwmE7jCrVqoQBI8nYIg3mhZUBU4KAK76SiNFXi0FKAiwo+V62KDDDJ0AMaHe3PzVihjC6A9gsJJ9N41PqjqVBlzOEjY8iBH57LJ/8AkMxLTYGw9nfTNuuRK0a3TNE48+HITAsNQBsYO63eH8XxdGo1omoXgZDm5kFwk+QtE6eawsLiKYDGjLmBkW0cNPTQ+gW9w7itQVnVBU8ZHijqB4YbYXjzgKU1Ep2z3Dgz3upMNRuVxAkcrXVuthw4EFcVwftLUpYfvMU3K1jGuc4OzHk6WgSDIncX1VPs5+0DPWqsr+FjA494Z8QNTwERtld106LrT4sxo7anhm02w1oHUAAn9BDVIyneRHvTYmsXgZDE79NfRFw3ChguS4ydbxfkqsVFLhfCQ0XkiZAdqOnW97/RX8PwilTM025T0n1VprpmxAHSSeoA0UYxlMOALwJmBzI1/wDSLYqR88/tA7O4n/5HGPw+ErVGPqgh1Ok97M2UOqTlHtFxn1K5PjfB8RhH0xiaXduewVWtOoaXObcbGWmy+sW0GjNo2XF03BLrlxhx89Nl89ftpxbavEQ4OBDaFIEAg5TLy5hjQgk26ppDcnVGBSw+KeO8p4arUpj77aT3MggRdrYBuLL1v9kXamviG1KFUgspU2FhAyuDS4NylwiRB1N+q6jsjgaeBwWHwjnAmmKFV5mwqOe19WP9LXCZP4gvJex3FXYXEY1lBwh2djXRcMZVOg5xv5LRNy4Zm1GHKPWuO4oNGVpDW/5jzLnmfZym5Gh+Cu8ExtBlNrKRzHr63dyHQLgKOMc85i4idJ38h71O/F5GE54to4+In+XYx02KqUOOSIzt8I6fjPG3FzhTkHQVDYt0mAbE6/muYPHTUcKAqVXs8RqHPk2IytDRAEkSYv6LExHE3l33nA7A+zfY81ZwGEYRUqDctpnWQHklx6eFpHqotLg12t82S4tveupktDMpysbnkBomCWkAusC4mQTmmylpMZOQVR3dMEudJOYOkuA1sXBo1k25EmbiFOlSIzeOpJd3Ygspy0Rm1m0G5I20Wp2Zo5u/quim3wkEE5gLHTa28bpOX0NR45Mqlgw/Mcr8zncjmDYmH2PwAgkCSq1WmGuNKoYcDN9DEiQSIO638VxZj4FMwHABhBDTlBNzuPvH081yfEg0VCADEAjmGxuL7xdJqxxdFyvSB2E3nYTzgKbD8Sa2hUoyA97gBFyQdmReZ32k6rMwuKkiQSJEiYJG8HXRH9oN5ENkgxf3DUga67KI8dlySfRSxGKc13hFvj8NCruF4i85iwkOIIc3TOD7QI5xtv5603UWsIFiD4gdZaSYkNnLobc9dFb7wFjSy9QOMmIiwymd77rVtGaTOn4JwyjimGGFj4sWuNjrpfpdVOM4DE4MAZi5jrh1swcPuk/Hr7wp+yPGWMFapUIpkBkkey4yfZaBqeQ90KhxLtfUxArMIApkCBALrGWkiTlN9FPLDhMpVuMVC9hMtjefnsuiocVdUaQHNvEQYIGxPTW+y44une6QA3j9dQjcVsNql2jqtqETmaLWvp13C6Phvamm4gOJBPuXBFgGllMwtIgmb6xtvvrysq9LIqSPWKXEGTEiVZfjABqvJcNjXtLoJIN73Pv22WxgsQaseNzXaNk5mOvp899ktgtx6CzFtO6mZWC81fxOrSflqQ4jdpm3QhXqXG3lvhuRrlk2iT6xf38kbGPejvjVCjOIAXn9HtTWJygBx0kecAkTG433RUO1FWm/JiKbjJgENhwMwbfeHkjy2Leju34qVHmBWLh+JMf7LgSbxofdqrTHpUOzUpEbFXKbli068K3TxQSY0abSncqDcUpPtKkZ8ovx0syzeZjpPzUdKjMubrYDWJIiQOnzKGnSb0194PL4q1hc1PwgDxGZJ56W5ALN8dFIio0svPN9Vq4d4pt7wyZNzvPzO+nNUMZTAcCNJAPTqPjbyXQYbBCs1gc9gaNXEwQToRvZc+aSpWb4l6jTocbpVWi5eWjLlza85abu8oVjF8VwzxRp0m9xTAefGWHNmgjM4km20c/RZFPhxZXJqtp6AtewyTAaIggQLTMT1gqWvWphzWwwl9gSA7z1GgjRENKnFNS4/wB/3o31HjmKGXY8Sbjf4/xT+PtndcI7U1KQDQx1ZobnzDMczC8AljmtPeZQ4EgXjmrze2dVrM4p02tGYGXPewjNcB7QACAIv9VT7McBxAZ31ZjBJ8FFxfThpBl2Vohpg6ZZ3kEkJcSwYq+FzKrGD7tI52h0k5pzteddIPRTLJHFJY55En+TneR5W8kYJJ/Bs8F7c4fEZC85NpgvpuAHP7pk3kbxurI4/nqlmfKwSbtNMEfizCDABdPLIDF1ymP7WYdn7vFnIaUU2VDTqtqPItmLh4XNNyWlo1smwLqONa40ngsm/hBGpykW/wBJPvWnnSq4q19leSlxPhnWO7WYZhIpvbUc46Ma99RxOgaTrrGogSbAX8vxHC8NW4m+tinsZRfWc6ox4LXANyxTMWuQATPNdhwjgfdZqjWteRIBaC1waNZk2fI25dU/G+yzMcRUe00qx0LY8bfuh+xO2b03VedInyoGrxutRd3Tq9Ud2138OmZzAtPtZRLjmDXWAHh9/lDeC1nYrEVaJZTY6q51NpnMWueYyzaYMxO/otDG9mMXhmuyRUyyS1oOcgXnuyL7iBJXR9lsJh61APABP32g5S09BNpyyCIsiepdekcdPG+SH7NiGgNGUloPiIa0kmxz5heBMfRZuN4XUpnM+INyZBBuJ0m9/wBaLt8Vhx4RzHhd8J85+a5/HUHtnXcEa+oB1n9dTHqpPhinporlHN1KwnUC2gHWwB2WphuJGjTxAZ/mQwbkZSHOcCdCJDf+55Kj9nNy3wPvHIjmDeCI+ojVR/Y25WZoDjn8ZGwaC0NO95uLDNvFuqMoyMJKUSTBPc8kzJc5rc2pkzMDU+4ra4rVdTptoU3XfYwTOUAATEBxOg1AAsd1mcMq06NVr4JAbIEwS7LB0B1g+h9FG3FOdV7xwE/hMAZYki8EdCqJ/BvYDg2ZjyH0ySCGgmDmMAOB/CAD56Dpk47Bd1WAeYzFzRl8QggtGl8smCN5I2VrieMLBSDW/umkFxY50Oe4EG4ME2MQBYDYqtxGHjMSSGnL3jrBsRAAIJcJM67mBsmrJZl4mn3ZIzXEEC8kHeNuSVDG1AJMx66Hf5rTwvDGZWHNne5rvBEeLLY5pB1i0e9UsVhDTDTPiiHAXgyfCToAQGm3P3DpjTa5CbVBzAyWkeR1F25TrIFtDEKRmDqR3gAbTs1h8WZ79Q0Ai7rjTSVnuHhaAZubQJ21Macr81o8P4ixlPEU6ji3NT/dwAQKzSCyxjVpe3MLjMVKXNFSfFlbHYoZCA5oLqkgD7jol8E3AuB1husKux2WabPEASS6Dci0i+kfM81iYio6o4udc7+gVl+KA7trJJaCHkTB6fP4LZwpGEcls1DVgCdDMRvGqRxjQASQJWR9tJ9kBug621/QUZJJzTJ2lZ7Ea+YzWdxCmN58gU7ccwAugx0+slZDmfmmqRAAvJn3WBVKKJc2bVDibHbkbdFd+1Q6SZJEedtfPRc7RoFxhg+snQD3wrVHFO84/LrpdDjXQKV9nV4DiVNrQIDTcF4a3NfkefrzVWrXAcTtNnZW+WgMQeSwhVgzHna/68lKHHXPAmIE8un5IVjaVG1nBLiw5XNPhEASBuDb3R8V1FJ7i1rRUhz/ABSDENAuJ2kz7l52zFk+EudPkCRfdaDuNFmWHudl/EBMggQSLx+uqbVkLg6ZnF3OApPpMq6nM7PLddHAyIUuH4rVYM1MlwABdTqXLQYhzXGHFtwOnUXWZh+0zyLNa0f6HET1kkoqfFDmPeslwMh+fxRqAHN8J6GEqK6Oio9pqbozNLDuDcfr0V+lxWkdHA+S4bEVhUeSXufeGvcczo2B96rB+V2UOE+cD3pbQs9K+2NNwUBx8c/kuAPFqjPCbi0gGbxI63F1aZ2ocLZT7gfmjYG48jrYKpTEATfUEE6aGPNStxVSWgg7AyN9PXZdhWwReADlNo3tebxqpn8PaGtktkbZdJm4GwJuvNeoXyej/H+ilQ4OKoaXeECCQWiXDQGdj5grXwlM0/FSY0GCBItra30HJRNdAawlpGojNIgWgDQRYgg9LypKWLEOb3ZLhABBiHTcwNTEXlc0pNm8YJIoHBVSXVKrmc8xdUIPKxp/VFU4O972Vc5Lj7NixoA0a3U2NwRE7qxUa55JsINgTe34iTcafFXMNnAadhYaAZhYwNSfLmiWpy9JmOPw/Txlvrn9s0OzfEsTS/ikvAEPc50kOI1+C6TC1gQXEwRqNflpqsPB8IqxL25GnUkgk6ai3PfyQ47i+EwuHfUDu8OzQ4gVHmA0RpNupAaeS83UaSWokmuH0dL2x+TA7c8cb9o7hzQWtDSc7QRmMkWcNPZ23UnYjjJqVcVRdka4MLmPaDDsp0In/UIjS689xmPqV65qOgucZygQ0SYa0A7f3JXc9nOFvcPtXsklrRobgyRHUjnt1Xs4tPDT4lBfByyzSyy5PRWPcQ3URcQ4TmAkX0O2ttfSXD46AczhA01IG9iTrGw0+Kz2YgBp8Ba5o3LS1zjeMwkgbbFUqmKa+Q2mRmNmyTmkZnWvfWOV46uwo3OG8WNZnsCq5hIc0Ed4QBE0zoXRsSJE3tBxvt+Bo1RUpQw1M0nKWgOzaOBs0mNTaxIOqhpfuCa7R4r5mgeJ0Ay+PK0fXXL7W4J1TDjF4Rvese7M4NkOpkyH5XC4OYeWouEQhBzuXT7NFG4tR93x+ftfv6O5ZXpEhhcCHnwjfNlJlvMa++Nwq+LwPjIdMRYiOvx1/UrhOyHFn0GPY+kTTBnxMsw6klrbt1vlEXmCV2+C7RYetDMwa8xlaXCHX/y3CzuosRuAqy4HDmPK+zCOZXtlw/pnN8Y4e5jiYgTII0Bn5HQ+qipYYFjhMtd93SCd29RGnRdtXw4ILXCQf1Y7Ln8VggzNsCT1Gtv5eXoojMtxOZwL34aq14ALTZrnDSYDhP3XWI8j1Uj+ICpUJAyQalTMQagZ4TpaSCctiDB6TOuzD2IdLmkhxkbjSoBz587rF4hwp1EucSCyTDhoZkwfw+tl2Y8u7h9nLPHXXRj16zWSWWGwk+GNJ5kKzV7wjIx+1uTjYWafvbe9Uq8ZbR5eUaE9Dp0VnC4ppcwkS0ODnNjwwBvA0k6LoMPwbPCXGtTeGBwqikWjuw4yRDy5xNgPAd/gsylUbmqCqIuCW3EZGx/9jfWVHSxBpBwY43Ab5i1geUtnXn1WfMG9pvc6ndAyR2IkuMak2gD3Rp5I8RRztsL+1O4ygz6R8lHSkmwnp+Ss03MptL6maIIywPG42DRsBEkk7c9Ek3uTQ3W1pmHVkCTodP17/cjojw+HXc/qyhLzUeAPT5kq5TIY4sF9ZNtYAN+U5vcFtM54ELm7NmN7b/lopqgGo5CZFtL+RU7RIcczRFxcGdrc9ZVYkAjUj3emqz7Nei01gOXUHzk7IMYG5mtGwgkb7nfW8IsODnaQdZ+Ig6qJlIueb6mJPVNAzSwv32t0JbmJA8NPc7x4iPcFDiKPduIOx+BuJ5G+k7KXBVy14ayHEw2YIGoItsMwBMzp5zX4niy+s8uABbaJcRYQdb7IQMJtUbeo67QUDfD4gZF7XPvUFB4M7A6x84U+W8e7l5qXwUuUIta88ifd8VL3E+HnGvP6bqFzJnp8DF/RHScAQdJ+BCLDbY2EfkkagmxEG/v0/urFDH1A1zGmGugEGCCRoZ21VbGNcRmgTMuOnroosNUIktHQ+qvvkz5XDNelWcDMXF4bMk20M6JVsYBlkS7k5txG3/sc1TBLwSLb8iED3udd5zH8RJJIiboTG0/g0mYpkXbE7nWBpEa35qeliLe0LWudVlUqstLCJ5edoUbaoHP3BOibNCrt5VPqtDGexR/6J/5Ekl88uz3mVsH/AA6vlT/rCAex/vf/AEhMklIv6Bq7f7f6Sp+zP+Ko/wC/+hydJTEJGx+07/DUf+p/4OXlXE/ueRSSXdg+Dize1lLB/wAQebP6gvZ+xn+Ab/3f/BJJbZujLEbdH+G//b/WFiUfZ/3O/wCV6dJc/wAHQLD+w7+Z/wAgrPYL/BVf5qn/ABpJJrpjXuj+0Y/BvYq/zO/5FjcY0P8AOPmUkl6S/wDDztT1L+z1Ch/CpfyMVLiejvL80kl5L7O7H7UVeG+y3yCo8f8A8PiP+k75lJJaR7Jl7Tgav8Nvp/SVb4J/DxP8n/7Ukkl6UfacL7IRt5N/pVfFaM8x80kkAWsHqP1sFX477NH/ALn9FFJJGP3Cyewq9mv8RT8nf0lQM/jD1/pSSWr7Zkul+xM0Hp9FZHtDySSUllnD/d/mb/UFFS+h+SSSSGyxR29Poq1LXEfy/knSTXTFL4K3D9fX6K/W/wAvyH1SSUy7Lh0M32x5H5p8Rp6n6JJKUWyxh/Z9FVqey3z+iSScPkmfSI8J/Ff6/VWaPsn+U/RJJW+yF0QYP2h5/VWMPofMpJK2Z/B//9k=",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1510925758641-869d353cecc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1629901925121-8a141c2a42f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1580238053495-b9720401fd45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1569074187119-c87815b476da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1325&q=80",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 8,
    src: "https://plus.unsplash.com/premium_photo-1671436824833-91c0741e89c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1610768764270-790fbec18178?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1507034589631-9433cc6bc453?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=684&q=80",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=882&q=80",
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1560089000-7433a4ebbd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1606244864456-8bee63fce472?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=681&q=80",
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1820&q=80",
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[400px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default Hero;