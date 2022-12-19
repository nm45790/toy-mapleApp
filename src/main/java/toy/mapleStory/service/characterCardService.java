package toy.mapleStory.service;

import org.json.simple.JSONObject;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.stereotype.Service;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class characterCardService implements characterCardServiceI{

    //WebDriver
    private WebDriver driver;
    // return json data
    private JSONObject j = new JSONObject();

    //Properties settings
    public static String WEB_DRIVER_ID = "webdriver.chrome.driver";
    public static String WEB_DRIVER_PATH = "/Users/iseongchan/toy-mapleapp/chromedriver/chromedriver"; // 다운받은 크롬드라이버 경로

    //System Property SetUp
    public void settings() {
        System.setProperty(WEB_DRIVER_ID, WEB_DRIVER_PATH);

        ChromeOptions options = new ChromeOptions();
       options.setHeadless(true);
       options.addArguments("--lang=ko");
       options.addArguments("--no-sandbox");
       options.addArguments("--disable-dev-shm-usage");
       options.addArguments("--disable-gpu");

        driver = new ChromeDriver(options);

        // browser loading timeout 1s
        driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);
    }

    // get url : user's detail info
    @Override
    public JSONObject getUserInfo(String name) throws InterruptedException {
        String url = "https://maplestory.nexon.com/Ranking/World/Total?c=" + name;
        driver.get(url);
        Thread.sleep(500);

        int characterChk = 0;
        int cnt = driver.findElement(By.xpath("//*[@id=\"container\"]/div/div/div[3]/div[1]/table/tbody")).findElements(By.tagName("dt")).size();

        // search character list
        for (int x=0; x<cnt; x++){
            String tmp = driver.findElement(By.xpath("//*[@id=\"container\"]/div/div/div[3]/div[1]/table/tbody/tr["+(x+1)+"]/td[2]/dl/dt/a")).getText(); // character name
//            System.out.println("compare name " + tmp + " ? "  + name + tmp.equals(name));

            // find character
            if (tmp.equals(name) == true){
                characterChk = 1;

                // character detail url
                String detailUrl = driver.findElement(By.xpath("//*[@id=\"container\"]/div/div/div[3]/div[1]/table/tbody/tr["+(x+1)+"]/td[2]/dl/dt/a")).getAttribute("href");
                // character level
                String level = driver.findElement(By.xpath("//*[@id=\"container\"]/div/div/div[3]/div[1]/table/tbody/tr["+(x+1)+"]/td[3]")).getText();
                String img = driver.findElement(By.xpath("//*[@id=\"container\"]/div/div/div[3]/div[1]/table/tbody/tr["+(x+1)+"]/td[2]/span/img[1]")).getAttribute("src");

                JSONObject info = new JSONObject();

                info.put("name", name);   // id
                info.put("level", level); // lv
                info.put("img", img);   // img

                j.put("characterInfo", info); // character info

                // detail url -> user basic info
                callDetailUrl(detailUrl, j);
                break;
            }
        }

        if (characterChk == 0){
            j.put("notFound","");
        }
        return j;
    }

    // getUserInfo -> callDetailUrl
    // get url : user's basic info
    public void callDetailUrl(String url, JSONObject j) throws InterruptedException {
        driver.get(url);
        Thread.sleep(500);

        // character detail info -> basic & stat
        String[] tmp = driver.findElement(By.xpath("//*[@id=\"container\"]/div[2]/div[2]/div/div[2]")).getText().split("\n");

        // split ability
        String ability = "";
        int hyperStatCnt = 0;
        for (int x=51; x<tmp.length; x++){
            // get hyperStat location
            if (tmp[x].equals("하이퍼스탯")){
//                System.out.println("stop");
                hyperStatCnt = x+1;
                break;
            }
            ability+=tmp[x]+"\n";
        }

        // split hyperStat
        String hyperStat = "";
        for (int y=hyperStatCnt; y<tmp.length; y++){
            hyperStat+=tmp[y]+"\n";
        }

//        System.out.println("ability:"+ability);
//        System.out.println("hyperstat:"+ hyperStat);

        // basic info setting -> json
        JSONObject basicInfo = new JSONObject();

        basicInfo.put("world",tmp[2]);  // 월드
        basicInfo.put("job",tmp[4]);    // 직업
        basicInfo.put("famous",tmp[6]); // 인기도
        basicInfo.put("guild",tmp[8]);  // 길드
        basicInfo.put("money",tmp[10]); // 메소
        basicInfo.put("maplePoint",tmp[12]); // 메이플포인트
        basicInfo.put("stat",tmp[15]); // 스탯공격력
        basicInfo.put("hp",tmp[17]);   // hp
        basicInfo.put("mp",tmp[19]);   // mp
        basicInfo.put("str",tmp[21]);  // str
        basicInfo.put("dex",tmp[23]);  // dex
        basicInfo.put("int",tmp[25]);  // int
        basicInfo.put("luk",tmp[27]);  // luk
        basicInfo.put("criticalDamage",tmp[29]);  // 크리티컬 데미지
        basicInfo.put("bossAttack",tmp[31]);      // 보스공격력
        basicInfo.put("defenseIgnore",tmp[33]);   // 방어율무시
        basicInfo.put("stateResistance",tmp[35]); // 상태이상내성
        basicInfo.put("stance",tmp[37]);      // 스탠스
        basicInfo.put("defensePower",tmp[39]);// 방어력
        basicInfo.put("moveSpeed",tmp[41]);   // 이동속도
        basicInfo.put("jumpPower",tmp[43]);   // 점프력
        basicInfo.put("starForce",tmp[45]);   // 스타포스
        basicInfo.put("fame",tmp[47]);        // 명성치
        basicInfo.put("arcaneForce",tmp[49]); // 아케인포스
        basicInfo.put("ability",ability);     // 어빌리티
        basicInfo.put("hyperStat",hyperStat); // 하이퍼스탯

        j.put("characterBasicInfo", basicInfo); // basic info

        // get character equip url
        String detailEquip = driver.findElement(By.xpath("//*[@id=\"container\"]/div[2]/div[1]/ul/li[3]/a")).getAttribute("href");
        // equip url -> user equip info
        callDetailEquip(detailEquip);

//        String detailRank = driver.findElement(By.xpath("//*[@id=\"container\"]/div[2]/div[1]/ul/li[1]/a")).getAttribute("href");
//        callDetailRank(detailRank);
//        String detailPet = driver.findElement(By.xpath("//*[@id=\"container\"]/div[2]/div[1]/ul/li[10]/a")).getAttribute("href");
//        callDetailPet(detailPet);
//        Thread.sleep(1000);

//        System.out.println("랭킹정보-->>"+driver.findElement(By.xpath("//*[@id=\"container\"]/div[2]/div[1]/ul/li[1]/a")).getAttribute("href"));
//        System.out.println("장비정보-->>"+driver.findElement(By.xpath("//*[@id=\"container\"]/div[2]/div[1]/ul/li[3]/a")).getAttribute("href"));
//        System.out.println("펫정보-->>"+driver.findElement(By.xpath("//*[@id=\"container\"]/div[2]/div[1]/ul/li[10]/a")).getAttribute("href"));
//        Thread.sleep(3000);
    }

    // getUserInfo -> callDetailEquip
    // get url : user's equipment info
    public void callDetailEquip(String detailEquip) throws InterruptedException {
        driver.get(detailEquip);
        Thread.sleep(500);

        JSONObject equipInfo = new JSONObject();
        List<JSONObject> e = new ArrayList<JSONObject>();

        // equip element -> /li[1] ~ /li[30]
        for (int x=1; x<31; x++){
            JSONObject equip = new JSONObject();

            // 2, 4, 9, 26, 27, 29 -> this index isn't equip -> not check
            if ((x==2) || (x==4) || (x==9) || (x==26) || (x==27) || (x==29)){
                System.out.println(x + ": not equip ... pass");
            }
            // check other index
            else{
                // img src length
                int imgSize = driver.findElement(By.xpath("//*[@id=\"container\"]/div[2]/div[2]/div/div[2]/div[1]/ul/li["+x+"]/img")).getAttribute("src").length();

                // img src is blank -> not check
                if (imgSize == 0) {
                    System.out.println(x + ": src is blank ... pass");
                }
                // this equip element(x) location click
                else{
                    // click and delay settings
                    driver.findElement(By.xpath("//*[@id=\"container\"]/div[2]/div[2]/div/div[2]/div[1]/ul/li["+x+"]")).click();
                    Thread.sleep(500);

                    // get this equip element's info -> text
                    String equipElement = driver.findElement(By.xpath("//*[@id=\"container\"]/div[2]/div[2]/div/div[2]/div[2]")).getText();
                    // get this equip element's index -> index
                    String img = driver.findElement(By.xpath("//*[@id=\"container\"]/div[2]/div[2]/div/div[2]/div[1]/ul/li["+x+"]/img")).getAttribute("src");

                    equipElement = equipElement.replace("착용 가능한 직업 | 초보자, 전사, 마법사, 궁수, 도적, 해적\n", "")
                            .replace("REQ LEV\n","")
                            .replace("REQ STR\n","")
                            .replace("REQ LUK\n","")
                            .replace("REQ DEX\n","")
                            .replace("REQ INT\n","")
                            .replace("기타\n","")
                            .replace("교환 불가\n","")
                            .replace("고유장착 아이템\n","")
                            .replace("황금망치 제련 적용\n","")
                            .replace("플래티넘 카르마의 가위를 사용하면 1회 교환이 가능하게 할 수 있습니다.\n","")
                            .replace("검은 마법사와의 결전을 준비하는 테네브리스 원정대를 위해 연합에서 제작한 특별한 힘을 가진 반지이다. 테네브리스 원정대 반지 강화 주문서만 사용 가능\n","")
                            .replace("잠재능력 재설정 불가\n","")
                            .replace("검은 마법사의 군단장 아카이럼이 지녔다고 알려진 전설의 목걸이\n","")
                            .replace("메이플스토리 18주년 기념 훈장이다.\n","");

                    System.out.println("----------");
                    System.out.println("x: "+ x);
                    System.out.println("img: "+ img);

                    String[] infoSplit = equipElement.split("\n");
                    System.out.println("장비이름:" + infoSplit[0]);
                    equip.put("equipName",infoSplit[0]);
                    equip.put("equipImg",img);

                    for(int y=0; y<infoSplit.length;y++){
                        if (infoSplit[y].contains("장비분류 |")){
                            System.out.println(infoSplit[y]+"-"+infoSplit[y]);
                            equip.put("equipCategory",infoSplit[y]);
                            y=y+1;
                        }
                        else if (infoSplit[y].equals("잠재옵션")){
                            System.out.println(infoSplit[y]+"-"+infoSplit[y+1]);
                            equip.put("equipPotential",infoSplit[y+1]);
                            y=y+1;
                        }
                        else if (infoSplit[y].equals("에디셔널 잠재옵션")){
                            System.out.println(infoSplit[y]+"-"+infoSplit[y+1]);
                            equip.put("equipAdditionalPotential",infoSplit[y+1]);
                            y=y+1;
                        }
                    }
                    equip.put("equipNum", x);

                    e.add(equip);

//                    equipInfo.put(x, equip); // index, equip
                    System.out.println("----------");
                }
            }
        }
        j.put("equipInfo",e);
    }

    // getUserInfo -> close
    public void close(){
//        driver.close();
        driver.quit();
    }

    // json data save to excel
    @Override
    public void saveBinFile(String name, JSONObject j) throws IOException {
        System.out.println("save bin file");

        try{
            System.out.println("check1");
            String fileName = "/Users/iseongchan/toy-mapleapp/data/"+name+".json";

            File jf = new File(fileName);
            BufferedWriter writer = new BufferedWriter(new FileWriter(jf));

            writer.write(j.toString());
            writer.close();

        }
        catch (IOException e){

        }

        System.out.println("파일 출력 완료!");
    }
}
