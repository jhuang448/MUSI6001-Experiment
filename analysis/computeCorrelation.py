import librosa
import numpy as np
import os

dataPath = 'E:/SEM1/Mus Perception&Cognition/dataAnalysis/recordings/'
fileList = ['m2_1.wav', 'm2_2.wav', 'm4_1.wav', 'm4_2.wav', 'm6_1.wav', 'm6_2.wav']
d = {}

def computeCorrelation():
    files = os.listdir(dataPath)
    for file in files:
        y, sr = librosa.load(dataPath+file)
        onset_env = librosa.onset.onset_strength(y=y, sr=sr)
        
        group = int(file[-7])
        stim = int(file[-5])
        stimuliFile = 'm' + str(2*stim) + '_' + str(1+group%2) + '.wav'
        y_s, sr_s = librosa.load(dataPath[:-11] + stimuliFile)
        assert(sr == sr_s)
        onset_env_s = librosa.onset.onset_strength(y=y_s, sr=sr_s)
        print(file)
        print(stimuliFile)
        score = normalizedCorr(onset_env, onset_env_s)
        print(score)
        if file[0:9] not in d:
            d[file[0:9]] = {}
            d[file[0:9]]["group"] = group
        d[file[0:9]][file[-5]] = score

def normalizedCorr(env1, env2):
    l = env1.shape[0]-env2.shape[0]
    ls = env2.shape[0]
    #print(l)
    #print(ls)
    allscore = np.zeros(l)
    for i in np.arange(l):
        #print(sum(env1[i:i+ls]*env2))
        allscore[i] = np.sum(env1[i:i+ls] * env2) / np.linalg.norm(env1[i:i+ls])
    score = np.max(allscore) / np.linalg.norm(env2)
    return score

def writeCSV(data):
    import csv
    with open('E:/test.csv', mode='w') as writefile:
        writer = csv.writer(writefile, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
        writer.writerow(['StudentID', 'Group', 'Stimuli No', 'Score'])
        for key in d.keys():
            writer.writerow([key, d[key]["group"], 1, d[key]['1']])
            writer.writerow([key, d[key]["group"], 2, d[key]['2']])
            writer.writerow([key, d[key]["group"], 3, d[key]['3']])
    

if __name__ == "__main__":
    computeCorrelation()
    print(d)
    writeCSV(d)
