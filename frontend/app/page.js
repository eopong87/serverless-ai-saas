"use client";

import { useState } from "react";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import { fetchAuthSession } from "aws-amplify/auth";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_n3JK6jzVS",
      userPoolClientId: "4hk1qiedna8fuh8a4eqdomu854",
    },
  },
});

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);

  const submitPrompt = async () => {
    setLoading(true);
    setResponse("");

    try {
      const session = await fetchAuthSession();
      const token = session.tokens.idToken.toString();

      const apiResponse = await fetch(
        "https://o055dlcx8b.execute-api.us-east-1.amazonaws.com/prompt",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            prompt: prompt,
          }),
        }
      );

      const data = await apiResponse.json();
      setResponse(data.aiResponse || data.message || "No response returned.");
    } catch (error) {
      setResponse("Error calling API.");
    }

    setLoading(false);
  };

  const loadHistory = async () => {
    setHistoryLoading(true);

    try {
      const session = await fetchAuthSession();
      const token = session.tokens.idToken.toString();

      const apiResponse = await fetch(
        "https://o055dlcx8b.execute-api.us-east-1.amazonaws.com/history",
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );

      const data = await apiResponse.json();
      setHistory(data.history || []);
    } catch (error) {
      console.log("History error:", error);
    }

    setHistoryLoading(false);
  };

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main className="min-h-screen bg-white text-black flex flex-col items-center p-10">
          <div className="w-full max-w-4xl">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-4xl font-bold">
                  Serverless AI SaaS Platform
                </h1>

                <p className="text-gray-600 mt-2">
                  Signed in as {user?.signInDetails?.loginId}
                </p>
              </div>

              <button
                onClick={signOut}
                className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-2 rounded-lg"
              >
                Sign Out
              </button>
            </div>

            <div className="bg-gray-100 border border-gray-300 p-6 rounded-xl mb-6">
              <h2 className="text-2xl font-bold mb-4">Ask the AI</h2>

              <textarea
                className="w-full h-40 p-4 rounded-lg bg-white text-black placeholder-gray-500 mb-4 border border-gray-300"
                placeholder="Ask the AI something..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />

              <button
                onClick={submitPrompt}
                disabled={loading || !prompt}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg text-lg font-semibold"
              >
                {loading ? "Loading..." : "Submit Prompt"}
              </button>
            </div>

            <div className="bg-gray-100 border border-gray-300 p-6 rounded-xl mb-6">
              <h2 className="text-2xl font-bold mb-4">AI Response</h2>

              <p className="text-gray-800 whitespace-pre-wrap">
                {response || "Your AI response will appear here."}
              </p>
            </div>

            <div className="bg-gray-100 border border-gray-300 p-6 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Prompt History</h2>

                <button
                  onClick={loadHistory}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                >
                  {historyLoading ? "Loading..." : "Load History"}
                </button>
              </div>

              {history.length === 0 ? (
                <p className="text-gray-600">
                  No history loaded yet.
                </p>
              ) : (
                history.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-300 rounded-lg p-4 mb-4"
                  >
                    <p className="font-semibold text-blue-700">
                      Prompt: {item.prompt?.S}
                    </p>

                    <p className="text-gray-800 whitespace-pre-wrap mt-2">
                      Response: {item.response?.S}
                    </p>

                    <p className="text-gray-500 text-sm mt-2">
                      Created: {item.createdAt?.S}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      )}
    </Authenticator>
  );
}