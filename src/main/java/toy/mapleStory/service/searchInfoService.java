package toy.mapleStory.service;

import org.json.simple.JSONObject;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;
import toy.mapleStory.vo.searchVO;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service
public class searchInfoService implements searchInfoServiceI{
    @Override
    public List<searchVO> infoList(String id) throws InterruptedException {

        List<searchVO> characterInfo = new ArrayList<>();

        String[] characterName = id.replace("입력받은 ID 리스트\r\n\r\n-", "")
                .replace("\r\n", "")
                .replace(" ", "")
                .split("-");

        for (String name : characterName) {
            TimeUnit.MILLISECONDS.sleep(500);

            searchVO info = new searchVO();

            final String Url = "https://maplestory.nexon.com/Ranking/World/Total?c=" + name;
            Connection conn = Jsoup.connect(Url);

            // 이름, 직업, 레벨, 경험치, 인기도, 길드
            try {
                Document document = conn.get();
                Elements ele = document.getElementsByClass("search_com_chk");

                String txt = ele.text();

                if (txt.length() > 0) {
                    String img = ele.select("img").get(3).attr("src");
                    String job = txt.substring(txt.indexOf(name) + name.length() + 1, txt.indexOf("Lv"));
                    String lv = txt.substring(txt.indexOf("Lv") + 3).split(" ")[0];

                    String[] var = txt.substring(txt.indexOf("Lv")).split(" ");
                    String exp = var[1];
                    String famous = var[2];
                    String guild = (var.length == 3) ? "-" : var[3];

                    String link = ele.select("a").attr("href");

                    info.setChk("y");
                    info.setImg(img);
                    info.setId(name);
                    info.setJob(job);
                    info.setLv(lv);
                    info.setExp(exp);
                    info.setFamous(famous);
                    info.setGuild(guild);
                    info.setDetailLink(link);
                } else {
                    info.setChk("n");
                    info.setImg("-");
                    info.setId(name);
                    info.setJob("-");
                    info.setLv("-");
                    info.setExp("-");
                    info.setFamous("-");
                    info.setGuild("-");
                    info.setDetailLink("-");
                }

                info.setMapleMoney("-");
                info.setInventoryLink("-");
                info.setStorageLink("-");

            } catch (IOException e) {
                e.printStackTrace();
            }

            characterInfo.add(info);
        }

        return characterInfo;
    }

    @Override
    public void subInfoList(List<searchVO> characterInfo) throws InterruptedException {

        for (toy.mapleStory.vo.searchVO searchVO : characterInfo) {
            TimeUnit.MILLISECONDS.sleep(300);

            if (searchVO.getChk().equals("y")) {
                final String Url = "https://maplestory.nexon.com" + searchVO.getDetailLink();
                Connection conn = Jsoup.connect(Url);

                // 메소, 정보 페이지 링크
                try {
                    Document document = conn.get();

                    if (document.getElementsByClass("private2").size() == 1) {
                        System.out.println("정보가 없습니다");
                        searchVO.setChk("n");
                        searchVO.setMapleMoney("-");
                        searchVO.setInventoryLink("-");
                        searchVO.setStorageLink("-");
                        continue;
                    }

                    String mapleMoney = document.getElementsByClass("table_style01").get(0).select("td").get(4).text();
                    String sideLinkInventory = document.getElementsByClass("lnb_list").get(0).select("a").get(3).attr("href");
                    String sideLinkStorage = document.getElementsByClass("lnb_list").get(0).select("a").get(4).attr("href");

                    searchVO.setMapleMoney(mapleMoney);
                    searchVO.setInventoryLink(sideLinkInventory);
                    searchVO.setStorageLink(sideLinkStorage);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    @Override
    public List<Map> itemInfoList(List<searchVO> characterInfo) throws InterruptedException {

        List<Map> itemList = new ArrayList<Map>();
        Map<Object, Object> allItemList = new HashMap<Object, Object>();

        // 캐릭터 인벤토리 조회
        for(int i=0; i<characterInfo.size(); i++) {
            if(characterInfo.get(i).getChk().equals("y")) {
                final String Url1 = "https://maplestory.nexon.com" + characterInfo.get(i).getInventoryLink();
                TimeUnit.MILLISECONDS.sleep(500);
                Connection conn = Jsoup.connect(Url1);

                Map<Object, Object> characterItemList = new HashMap<Object, Object>();

                try {
                    Document document = conn.get();

                    Elements e1 = document.getElementsByClass("tab01_con_wrap"); // 장비
                    Elements e2 = document.getElementsByClass("tab02_con_wrap"); // 소비
                    Elements e3 = document.getElementsByClass("tab03_con_wrap"); // 기타
                    Elements e4 = document.getElementsByClass("tab04_con_wrap"); // 설치
                    Elements e5 = document.getElementsByClass("tab05_con_wrap"); // 캐시

                    Map<Integer, String> e1Img= new HashMap<Integer, String>();
                    Map<Integer, String> e2Img= new HashMap<Integer, String>();
                    Map<Integer, String> e3Img= new HashMap<Integer, String>();
                    Map<Integer, String> e4Img= new HashMap<Integer, String>();
                    Map<Integer, String> e5Img= new HashMap<Integer, String>();

                    Map<Integer, String> e1Item = new HashMap<Integer, String>();
                    Map<Integer, String> e2Item = new HashMap<Integer, String>();
                    Map<Integer, String> e3Item = new HashMap<Integer, String>();
                    Map<Integer, String> e4Item = new HashMap<Integer, String>();
                    Map<Integer, String> e5Item = new HashMap<Integer, String>();

                    int e1Size = e1.select("li").select("a").size();
                    int e2Size = e2.select("li").select("a").size();
                    int e3Size = e3.select("li").select("a").size();
                    int e4Size = e4.select("li").select("a").size();
                    int e5Size = e5.select("li").select("a").size();

                    /* 장비 list */
                    for(int e1Index=0; e1Index<e1Size/2;e1Index++) {
                        String img = e1.select("li").select("a").get(calc(e1Index,2,'*')).select("img").attr("src");
                        String txt = e1.select("li").select("a").get(calc(calc(e1Index,2,'*'),1,'+')).text();

                        e1Img.put(e1Index, img);
                        e1Item.put(e1Index, txt);
                    }
                    characterItemList.put(e1Img, e1Item);

                    /* 소비 list */
                    for(int e2Index=0; e2Index<e2Size/2;e2Index++) {
                        String img = e2.select("li").select("a").get(calc(e2Index,2,'*')).select("img").attr("src");
                        String txt = e2.select("li").select("a").get(calc(calc(e2Index,2,'*'),1,'+')).text();

                        e2Img.put(e2Index, img);
                        e2Item.put(e2Index, txt);
                    }
                    characterItemList.put(e2Img, e2Item);

                    /* 기타 list */
                    for(int e3Index=0; e3Index<e3Size/2;e3Index++) {
                        String img = e3.select("li").select("a").get(calc(e3Index,2,'*')).select("img").attr("src");
                        String txt = e3.select("li").select("a").get(calc(calc(e3Index,2,'*'),1,'+')).text();

                        e3Img.put(e3Index, img);
                        e3Item.put(e3Index, txt);
                    }
                    characterItemList.put(e3Img, e3Item);

                    /* 설치 list */
                    for(int e4Index=0; e4Index<e4Size/2;e4Index++) {
                        String img = e4.select("li").select("a").get(calc(e4Index,2,'*')).select("img").attr("src");
                        String txt = e4.select("li").select("a").get(calc(calc(e4Index,2,'*'),1,'+')).text();

                        e4Img.put(e4Index, img);
                        e4Item.put(e4Index, txt);
                    }
                    characterItemList.put(e4Img, e4Item);

                    /* 캐시 */
                    for(int e5Index=0; e5Index<e5Size/2;e5Index++) {
                        String img = e5.select("li").select("a").get(calc(e5Index,2,'*')).select("img").attr("src");
                        String txt = e5.select("li").select("a").get(calc(calc(e5Index,2,'*'),1,'+')).text();

                        e5Img.put(e5Index, img);
                        e5Item.put(e5Index, txt);
                    }
                    characterItemList.put(e5Img, e5Item);
                }
                catch (IOException e) {
                    e.printStackTrace();
                }
                allItemList.put(characterInfo.get(i).getId(), characterItemList);
            }
        }
        itemList.add(allItemList);

        return itemList;
    }

    @Override
    public String getStorageMoney(List<searchVO> characterInfo) throws InterruptedException {

        String storageMoney = "-";

        for(int i=0; i<characterInfo.size(); i++) {
            TimeUnit.MILLISECONDS.sleep(500);
            if (!characterInfo.get(i).getStorageLink().equals("-")) {
                final String Url = "https://maplestory.nexon.com" + characterInfo.get(i).getStorageLink();
                Connection conn = Jsoup.connect(Url);

                // 창고 메소
                try {
                    Document document = conn.get();
                    storageMoney = document.getElementsByClass("money_txt").text();
                }
                catch (IOException e) {
                    e.printStackTrace();
                }
                break;
            }
        }
        return storageMoney;
    }

    @Override
    public Long calcTotalMoney(List<searchVO> characterInfo) throws InterruptedException {
        Long totalMoney = 0L;

        for(int i=0; i<characterInfo.size(); i++){
            TimeUnit.MILLISECONDS.sleep(500);

            if (characterInfo.get(i).getChk().equals("y")) {
                String tmp = characterInfo.get(i).getMapleMoney().replace(",", "");
                totalMoney += Long.parseLong(tmp);
            }
        }
        return totalMoney;
    }

    /* ------------------------ */
    @Override
    public searchVO _infoList(String name) throws InterruptedException {

        searchVO info = new searchVO();

        final String Url = "https://maplestory.nexon.com/Ranking/World/Total?c=" + name;
        Connection conn = Jsoup.connect(Url);

        // 이름, 직업, 레벨, 경험치, 인기도, 길드
        try {
            Document document = conn.get();
            Elements ele = document.getElementsByClass("search_com_chk");

            String txt = ele.text();

            if (txt.length() > 0) {
                String img = ele.select("img").get(3).attr("src");
                String job = txt.substring(txt.indexOf(name) + name.length() + 1, txt.indexOf("Lv"));
                String lv = txt.substring(txt.indexOf("Lv") + 3).split(" ")[0];

                String[] var = txt.substring(txt.indexOf("Lv")).split(" ");
                String exp = var[1];
                String famous = var[2];
                String guild = (var.length == 3) ? "-" : var[3];

                String link = ele.select("a").attr("href");

                info.setChk("y");
                info.setImg(img);
                info.setId(name);
                info.setJob(job);
                info.setLv(lv);
                info.setExp(exp);
                info.setFamous(famous);
                info.setGuild(guild);
                info.setDetailLink(link);
            } else {
                info.setChk("n");
                info.setImg("-");
                info.setId(name);
                info.setJob("-");
                info.setLv("-");
                info.setExp("-");
                info.setFamous("-");
                info.setGuild("-");
                info.setDetailLink("-");
            }

            info.setMapleMoney("-");
            info.setInventoryLink("-");
            info.setStorageLink("-");

        } catch (IOException e) {
            e.printStackTrace();
        }

        return info;
    }

    @Override
    public void _subInfoList(searchVO searchVO) throws InterruptedException {
        if (searchVO.getChk().equals("y")) {
            final String Url = "https://maplestory.nexon.com" + searchVO.getDetailLink();
            Connection conn = Jsoup.connect(Url);

            // 메소, 정보 페이지 링크
            try {
                Document document = conn.get();

                if (document.getElementsByClass("private2").size() == 1) {
                    System.out.println("정보가 없습니다");
                    searchVO.setChk("n");
                    searchVO.setMapleMoney("-");
                    searchVO.setInventoryLink("-");
                    searchVO.setStorageLink("-");
                }

                else{
                    String mapleMoney = document.getElementsByClass("table_style01").get(0).select("td").get(4).text();
                    String sideLinkInventory = document.getElementsByClass("lnb_list").get(0).select("a").get(3).attr("href");
                    String sideLinkStorage = document.getElementsByClass("lnb_list").get(0).select("a").get(4).attr("href");

                    searchVO.setMapleMoney(mapleMoney);
                    searchVO.setInventoryLink(sideLinkInventory);
                    searchVO.setStorageLink(sideLinkStorage);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public List<JSONObject> _itemInfoList(searchVO characterInfo) throws InterruptedException {
        List<JSONObject> characterItemList = new ArrayList<JSONObject>();

        // 캐릭터 인벤토리 조회
        if(characterInfo.getChk().equals("y")) {
            final String Url1 = "https://maplestory.nexon.com" + characterInfo.getInventoryLink();
            TimeUnit.MILLISECONDS.sleep(500);
            Connection conn = Jsoup.connect(Url1);

            try {
                Document document = conn.get();

                Elements e1 = document.getElementsByClass("tab01_con_wrap"); // 장비
                Elements e2 = document.getElementsByClass("tab02_con_wrap"); // 소비
                Elements e3 = document.getElementsByClass("tab03_con_wrap"); // 기타
                Elements e4 = document.getElementsByClass("tab04_con_wrap"); // 설치
                Elements e5 = document.getElementsByClass("tab05_con_wrap"); // 캐시

                JSONObject e1Item = new JSONObject();
                JSONObject e2Item = new JSONObject();
                JSONObject e3Item = new JSONObject();
                JSONObject e4Item = new JSONObject();
                JSONObject e5Item = new JSONObject();

                int e1Size = e1.select("li").select("a").size();
                int e2Size = e2.select("li").select("a").size();
                int e3Size = e3.select("li").select("a").size();
                int e4Size = e4.select("li").select("a").size();
                int e5Size = e5.select("li").select("a").size();

                /* 장비 list */
                for(int e1Index=0; e1Index<e1Size/2;e1Index++) {
                    String img = e1.select("li").select("a").get(calc(e1Index,2,'*')).select("img").attr("src");
                    String txt = e1.select("li").select("a").get(calc(calc(e1Index,2,'*'),1,'+')).text();

                    e1Item.put(txt, img);
                }
                characterItemList.add(e1Item);

                /* 소비 list */
                for(int e2Index=0; e2Index<e2Size/2;e2Index++) {
                    String img = e2.select("li").select("a").get(calc(e2Index,2,'*')).select("img").attr("src");
                    String txt = e2.select("li").select("a").get(calc(calc(e2Index,2,'*'),1,'+')).text();

                    e2Item.put(txt, img);
                }
                characterItemList.add(e2Item);

                /* 기타 list */
                for(int e3Index=0; e3Index<e3Size/2;e3Index++) {
                    String img = e3.select("li").select("a").get(calc(e3Index,2,'*')).select("img").attr("src");
                    String txt = e3.select("li").select("a").get(calc(calc(e3Index,2,'*'),1,'+')).text();

                    e3Item.put(txt, img);
                }
                characterItemList.add(e3Item);

                /* 설치 list */
                for(int e4Index=0; e4Index<e4Size/2;e4Index++) {
                    String img = e4.select("li").select("a").get(calc(e4Index,2,'*')).select("img").attr("src");
                    String txt = e4.select("li").select("a").get(calc(calc(e4Index,2,'*'),1,'+')).text();

                    e4Item.put(txt, img);
                }
                characterItemList.add(e4Item);

                /* 캐시 */
                for(int e5Index=0; e5Index<e5Size/2;e5Index++) {
                    String img = e5.select("li").select("a").get(calc(e5Index,2,'*')).select("img").attr("src");
                    String txt = e5.select("li").select("a").get(calc(calc(e5Index,2,'*'),1,'+')).text();

                    e5Item.put(txt, img);
                }
                characterItemList.add(e5Item);
            }
            catch (IOException e) {
                e.printStackTrace();
            }
        }

        return characterItemList;
    }

    @Override
    public String _getStorageMoney(searchVO characterInfo) throws InterruptedException {

        String storageMoney = "-";
//
//        for(int i=0; i<characterInfo.size(); i++) {
//            TimeUnit.MILLISECONDS.sleep(500);
//            if (!characterInfo.get(i).getStorageLink().equals("-")) {
//                final String Url = "https://maplestory.nexon.com" + characterInfo.get(i).getStorageLink();
//                Connection conn = Jsoup.connect(Url);
//
//                // 창고 메소
//                try {
//                    Document document = conn.get();
//                    storageMoney = document.getElementsByClass("money_txt").text();
//                }
//                catch (IOException e) {
//                    e.printStackTrace();
//                }
//                break;
//            }
//        }
        return storageMoney;
    }

    @Override
    public Long _calcTotalMoney(searchVO characterInfo) throws InterruptedException {
        Long totalMoney = 0L;

//        for(int i=0; i<characterInfo.size(); i++){
//            TimeUnit.MILLISECONDS.sleep(500);
//
//            if (characterInfo.get(i).getChk().equals("y")) {
//                String tmp = characterInfo.get(i).getMapleMoney().replace(",", "");
//                totalMoney += Long.parseLong(tmp);
//            }
//        }

        return totalMoney;
    }

    @Override
    public void saveBinFile(String name, JSONObject j) throws IOException {
        System.out.println("save bin file");

        try{
            System.out.println("check1");
            String fileName = "data/"+name+".json";

            File jf = new File(fileName);
            BufferedWriter writer = new BufferedWriter(new FileWriter(jf));

            writer.write(j.toString());
            writer.close();

        }
        catch (IOException e){

        }

        System.out.println("파일 출력 완료!");
    }

    public static int calc(int x, int y, char opr) {

        if (opr == '+') {
            return x+y;
        }
        else if (opr == '-') {
            return x-y;
        }
        else if (opr == '*') {
            return x*y;
        }
        else if (opr == '/') {
            return x/y;
        }
        else {
            return 0;
        }

    }
}
