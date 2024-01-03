import axios from 'axios';
import * as cheerio from 'cheerio';

export class MapleInvenLoader {
  async load(): Promise<MapleInvenLoaderResult[]> {
    const url = 'https://www.inven.co.kr/board/maple/5974?my=chuchu&vtype=pc';
    const { data } = await axios.get<string>(url);

    const $ = cheerio.load(data);
    const $board = $('article#new-board div.board-list');
    const $rows = $board.find('tbody tr').not('.notice');

    const results = $rows
      .toArray()
      .map((e) => $(e))
      .map(($row) => {
        const $link = $row.find('td.tit a.subject-link');
        const title = $link.text().trim().replace(/\s+/g, ' ');
        const link = $link.attr('href') ?? '';
        const icon =
          'https://static.inven.co.kr/image_2011/common/channel/icon_78x78_maple.png?v=231023a';
        const raw = $row.html();
        return { title, link, icon };
      });
    return results;
  }
}

type MapleInvenLoaderResult = {
  title: string;
  link: string;
};
