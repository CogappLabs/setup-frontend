import cv2
import numpy as np
import argparse
import datetime
import pause

if __name__ == '__main__':

    parser = argparse.ArgumentParser()
    parser.add_argument('-t', '--time', dest='time')
    args = parser.parse_args()
    print(args.time)
    time = datetime.datetime.fromtimestamp(int(args.time)/1000.)
    start_time = time + datetime.timedelta(seconds=3)
    print(start_time)


    file_name = "video.mp4"
    window_name = "window"
    interframe_wait_ms = 30

    cap = cv2.VideoCapture(file_name)
    if not cap.isOpened():
        print("Error: Could not open video.")
        exit()

    cv2.namedWindow(window_name, cv2.WND_PROP_FULLSCREEN)
    cv2.setWindowProperty(window_name, cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)

    first = True
    while (True):
        ret, frame = cap.read()
        if not ret:
            print("Reached end of video, exiting.")
            break
        if first:
            pause.until(start_time)
        cv2.imshow(window_name, frame)
        if cv2.waitKey(interframe_wait_ms) & 0x7F == ord('q'):
            print("Exit requested.")
            break

cap.release()
cv2.destroyAllWindows()
