package toy.mapleStory.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import toy.mapleStory.service.searchInfoService;
import toy.mapleStory.vo.searchVO;

import java.util.List;

@Controller
public class searchController {

    @Autowired
    private searchInfoService searchService;

    @GetMapping(value="/search")
    public String search(Model model){
        model.addAttribute("data", "hi~~");

        return "/index";
    }

    @PostMapping(value="/searchInfo")
    public String searchInfo(Model model, @RequestParam("showId") String id) throws InterruptedException {

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
//        List<Map> itemMapList = searchService.itemInfoList(characterInfo);
//
//        검색 캐릭터 창고 메소
//        String storageMoney = searchService.getStorageMoney(characterInfo);

        model.addAttribute("characterInfo", characterInfo);
        model.addAttribute("characterInfoSize", characterInfo.size());
        model.addAttribute("characterTotalMoney", totalMoney);
//        model.addAttribute("itemMapList", itemMapList);
//        model.addAttribute("storageMoney", storageMoney);

        return "/searchInfo";
    }



}
