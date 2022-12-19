package toy.mapleStory.service;

import org.json.simple.JSONObject;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class webDriver {
    //WebDriver 설정
    private WebDriver driver;
    // return json data
    private JSONObject j = new JSONObject();

    //Properties settings
    public static String WEB_DRIVER_ID = "webdriver.chrome.driver";
    public static String WEB_DRIVER_PATH = "C:/Users/nerin/바탕 화면/myproject/2. Intelliji/toy-mapleApp/chromedriver/chromedriver.exe"; // 다운받은 크롬드라이버 경로


    public webDriver() {
        //System Property SetUp
        chrome();
    }

    private void chrome() {
        System.setProperty(WEB_DRIVER_ID, WEB_DRIVER_PATH);

        ChromeOptions options = new ChromeOptions();
//        options.setHeadless(true);
//        options.addArguments("--lang=ko");
//        options.addArguments("--no-sandbox");
//        options.addArguments("--disable-dev-shm-usage");
//        options.addArguments("--disable-gpu");

        driver = new ChromeDriver(options);

        // browser loading timeout 1s
        driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);
    }

    public JSONObject useDriver(String name) throws InterruptedException {
        String url = "https://maplestory.nexon.com/Ranking/World/Total?c=" + name;

        driver.get(url);
        Thread.sleep(500);

        int cnt = driver.findElement(By.xpath("//*[@id=\"container\"]/div/div/div[3]/div[1]/table/tbody")).findElements(By.tagName("dt")).size();
        System.out.println(cnt);

        for (int x=0; x<cnt; x++){
            String tmp = driver.findElement(By.xpath("//*[@id=\"container\"]/div/div/div[3]/div[1]/table/tbody/tr["+(x+1)+"]/td[2]/dl/dt/a")).getText();
            System.out.println(tmp + " ? "  + name + tmp.equals(name));
            if (tmp.equals(name) == true){
                System.out.println(tmp + " == " + name);
                String detailUrl = driver.findElement(By.xpath("//*[@id=\"container\"]/div/div/div[3]/div[1]/table/tbody/tr["+(x+1)+"]/td[2]/dl/dt/a")).getAttribute("href");
                String level = driver.findElement(By.xpath("//*[@id=\"container\"]/div/div/div[3]/div[1]/table/tbody/tr["+(x+1)+"]/td[3]")).getText();

                j.put("name", name);
                j.put("level", level);

                callDetailUrl(detailUrl, j);
                break;
            }
        }

        // 검색 캐릭터 이동
        // 반복문으로 url 찾기

        return j;
    }

    public void callDetailUrl(String url, JSONObject j) throws InterruptedException {
        driver.get(url);
        Thread.sleep(500);
        String[] tmp = driver.findElement(By.xpath("//*[@id=\"container\"]/div[2]/div[2]/div/div[2]")).getText().split("\n");

        String ability = "";
        int hyperStatCnt = 0;
        for (int x=51; x<tmp.length; x++){
            if (tmp[x].equals("하이퍼스탯")){
                System.out.println("stop");
                hyperStatCnt = x+1;
                break;
            }
            ability+=tmp[x]+"\n";
        }

        String hyperStat = "";
        for (int y=hyperStatCnt; y<tmp.length; y++){
            hyperStat+=tmp[y]+"\n";
        }

        System.out.println("ability:"+ability);
        System.out.println("hyperstat:"+ hyperStat);

        j.put("aWorld",tmp[2]);  // 월드
        j.put("aJob",tmp[4]);    // 직업
        j.put("aFamous",tmp[6]); // 인기도
        j.put("aGuild",tmp[8]);  // 길드
        j.put("aMoney",tmp[10]); // 메소
        j.put("aMaplePoint",tmp[12]); // 메이플포인트
        j.put("aStat",tmp[15]); // 스탯공격력
        j.put("aHp",tmp[17]); // hp
        j.put("aMp",tmp[19]); // mp
        j.put("aStr",tmp[21]); // str
        j.put("aDex",tmp[23]); // dex
        j.put("aInt",tmp[25]); // int
        j.put("aLuk",tmp[27]); // luk
        j.put("aCriticalDamage",tmp[29]); // 크리티컬 데미지
        j.put("aBossAttack",tmp[31]); // 보스공격력
        j.put("aDefenseIgnore",tmp[33]); // 방어율무시
        j.put("aStateResistance",tmp[35]); // 상태이상내성
        j.put("aStance",tmp[37]); // 스탠스
        j.put("aDefensePower",tmp[39]); // 방어력
        j.put("aMoveSpeed",tmp[41]); // 이동속도
        j.put("aJumpPower",tmp[43]); // 점프력
        j.put("aStarForce",tmp[45]); // 스타포스
        j.put("aFame",tmp[47]); // 명성치
        j.put("aArcaneForce",tmp[49]); // 아케인포스
        j.put("aAbility",ability); // 어빌리티
        j.put("aHyperStat",hyperStat); // 하이퍼스탯

        String detailEquip = driver.findElement(By.xpath("//*[@id=\"container\"]/div[2]/div[1]/ul/li[3]/a")).getAttribute("href");
        callDetailEquip(detailEquip);
        Thread.sleep(500);

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

    public void callDetailEquip(String detailEquip) throws InterruptedException {
        //*[@id="container"]/div[2]/div[2]/div/div[2]/div[1]/ul/li[1]
        //*[@id="container"]/div[2]/div[2]/div/div[2]/div[1]/ul/li[2]
        //*[@id="container"]/div[2]/div[2]/div/div[2]/div[1]/ul/li[3]
        //...
        //*[@id="container"]/div[2]/div[2]/div/div[2]/div[1]/ul/li[30]


        driver.get(detailEquip);
        Thread.sleep(500);

        List<String> tmp1 = new ArrayList<String>();
        List<Integer> tmp2 = new ArrayList<Integer>();

        for (int x=1; x<31; x++){
            driver.findElement(By.xpath("//*[@id=\"container\"]/div[2]/div[2]/div/div[2]/div[1]/ul/li["+x+"]")).click();
            Thread.sleep(500);

            String txt = driver.findElement(By.xpath("//*[@id=\"container\"]/div[2]/div[2]/div/div[2]/div[2]")).getText();
            int lth = driver.findElement(By.xpath("//*[@id=\"container\"]/div[2]/div[2]/div/div[2]/div[2]")).getText().length();
//            System.out.println("text:"+ txt);
//            System.out.println("length:"+ lth);
            tmp1.add(txt);
            tmp2.add(lth);
//            Thread.sleep(500);
        }
        System.out.println(tmp1);
        System.out.println(tmp2);
        System.out.println("----");
    }
//    public void callDetailPet(String detailPet) throws InterruptedException {
//        driver.get(detailPet);
//        Thread.sleep(500);
//    }

    public void close(){
//        driver.close();
        driver.quit();
    }
}
