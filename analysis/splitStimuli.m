dataPath = 'E:\html\myexp\audio\stimuli\';

fileList = {'m2_1.wav', 'm2_2.wav', 'm4_1.wav', 'm4_2.wav', 'm6_1.wav', 'm6_2.wav'};
writefileList = {'m2_1.wav', 'm2_2.wav', 'm4_1.wav', 'm4_2.wav', 'm6_1.wav', 'm6_2.wav'};

for i = 1:6
    [y, fs] = audioread([dataPath fileList{i}]);
    bg = 2.65*fs;
    ed = floor(bg + (size(y, 1)-bg)/2);
    y_split = y(bg:ed, :);
    audiowrite(writefileList{i}, y_split, fs);
end