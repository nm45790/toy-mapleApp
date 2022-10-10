package toy.mapleStory.service;

import toy.mapleStory.vo.searchVO;

import java.util.List;
import java.util.Map;

public interface searchInfoServiceI {
    public abstract List<searchVO> infoList(String id) throws InterruptedException;
    public abstract void subInfoList(List<searchVO> characterInfo) throws InterruptedException;
    public abstract List<Map> itemInfoList(List<searchVO> characterInfo) throws InterruptedException;
    public abstract String getStorageMoney(List<searchVO> characterInfo) throws InterruptedException;
    public abstract Long calcTotalMoney(List<searchVO> characterInfo);
}
