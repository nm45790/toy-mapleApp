package toy.mapleStory.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import toy.mapleStory.service.searchInfoService;
import toy.mapleStory.vo.searchVO;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins="*", allowedHeaders="*") /* CORS 어노테이션 */
@RestController
public class jsonController {

    @Autowired
    private searchInfoService searchService;

    @GetMapping(value="/callApi")
    public String frontCallApi(){
        System.out.println("!!");
        List<JSONObject> json = new ArrayList<JSONObject>();
        JSONObject i = new JSONObject();
        JSONObject j = new JSONObject();

        i.put("1", "b");
        i.put("2", "d");
        i.put("3", "f");

        j.put("4", "b");
        j.put("5", "d");
        j.put("6", "f");

        json.add(i);
        json.add(j);

        System.out.println(json);

        return json.toString();
    }

    @GetMapping("/api/searchInfo")
    public String searchInfo(@RequestParam(value="id", required=false) String id) throws InterruptedException {

        System.out.println("요청 도착");
        System.out.println(id);

        // 검색 캐릭터 이름, 직업, 레벨, 경험치, 인기도, 길드 정보
        List<searchVO> characterInfo = searchService.infoList(id);

        // 검색 캐릭터 메소, 인벤토리 / 창고 링크
        searchService.subInfoList(characterInfo);

        // 검색 캐릭터 메소 합
        Long totalMoney = searchService.calcTotalMoney(characterInfo);
//
//        검색 캐릭터 인벤토리
        List<Map> itemMapList = searchService.itemInfoList(characterInfo);
//
//      검색 캐릭터 창고 메소
        String storageMoney = searchService.getStorageMoney(characterInfo);

        JSONObject json = new JSONObject();
        json.put("characterInfo", characterInfo);
        json.put("characterTotalMoney", totalMoney);
        json.put("itemMapList", itemMapList);
        json.put("storageMoney", storageMoney);

        System.out.println(json);

        return json.toString();
    }
}

