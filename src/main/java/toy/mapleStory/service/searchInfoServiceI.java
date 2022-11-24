package toy.mapleStory.service;

import org.json.simple.JSONObject;
import toy.mapleStory.vo.searchVO;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface searchInfoServiceI {
    public abstract List<searchVO> infoList(String id) throws InterruptedException;
    public abstract void subInfoList(List<searchVO> characterInfo) throws InterruptedException;
    public abstract List<Map> itemInfoList(List<searchVO> characterInfo) throws InterruptedException;
    public abstract String getStorageMoney(List<searchVO> characterInfo) throws InterruptedException;
    public abstract Long calcTotalMoney(List<searchVO> characterInfo) throws InterruptedException;

    /* ----------- */
    public abstract searchVO _infoList(String id) throws InterruptedException;
    public abstract void _subInfoList(searchVO characterInfo) throws InterruptedException;
    public abstract List<JSONObject> _itemInfoList(searchVO characterInfo) throws InterruptedException;
    public abstract String _getStorageMoney(searchVO characterInfo) throws InterruptedException;
    public abstract Long _calcTotalMoney(searchVO characterInfo) throws InterruptedException;
    public abstract void saveBinFile(String name, JSONObject j) throws IOException;
}
