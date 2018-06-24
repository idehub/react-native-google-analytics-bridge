package com.idehub.GoogleAnalyticsBridge;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableArray;

import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

/**
 * Converts a List to WritableList and Map to WritableList
 */
public class ConvertToWritable {
    public static WritableMap map(Map<String, Object> map) {
        WritableMap writableMap = Arguments.createMap();
        for (Map.Entry<String, Object> entry : map.entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();

            if (value == null) {
                writableMap.putNull(key);
            } else if (value instanceof Integer) {
                writableMap.putInt(key, (Integer) value);
            } else if (value instanceof Long) {
                writableMap.putDouble(key, (Double) value);
            } else if (value instanceof Double) {
                writableMap.putDouble(key, (Double) value);
            } else if (value instanceof List)  {
                writableMap.putArray(key, ConvertToWritable.array((List<Object>) value));
            } else if (value instanceof Map)  {
                writableMap.putMap(key, ConvertToWritable.map((Map<String, Object>) value));
            } else if (value instanceof String)  {
                writableMap.putString(key, (String) value);
            } else {
                writableMap.putString(key, value.toString());
            }
        }
        return writableMap;
    }

    public static WritableArray array(List<Object> list) {
        WritableArray writableArray = Arguments.createArray();
        Iterator<Object> iterator = list.iterator();
        while (iterator.hasNext()) {
            Object value = iterator.next();
            if (value == null) {
                writableArray.pushNull();
            } else if (value instanceof Integer) {
                writableArray.pushInt((Integer) value);
            } else if (value instanceof Long) {
                writableArray.pushDouble((Double) value);
            } else if (value instanceof Double) {
                writableArray.pushDouble((Double) value);
            } else if (value instanceof List)  {
                writableArray.pushArray(ConvertToWritable.array((List<Object>) value));
            } else if (value instanceof Map)  {
                writableArray.pushMap(ConvertToWritable.map((Map<String, Object>) value));
            } else if (value instanceof String)  {
                writableArray.pushString((String) value);
            } else {
                writableArray.pushString(value.toString());
            }
        }
        return writableArray;
    }
}
