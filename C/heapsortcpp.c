#include <stdio.h>

#define SIZE 6

void constroiHeap(int v[], int tamanhoHeap, int pai);
void printVetor(int v[]);

int main(){
	
	int v[] = {1,2,3,4,5,6},
		tamanhoHeap = SIZE,	
		pai = (tamanhoHeap-2)/2;
		
	/*Construir MAXHEAP*/
	for(;pai!=-1;pai--){
		constroiHeap(v, tamanhoHeap, pai);
	}

	/*Swaps e reconstruÁ„o da HEAP*/
	while(tamanhoHeap>1){

		int aux = v[0];
		v[0] = v[tamanhoHeap-1];
		v[tamanhoHeap-1] = aux;
		tamanhoHeap--;
		constroiHeap(v, tamanhoHeap, 0);
	}
	
	/*Exibir vetor ordenado*/
	printVetor(v);
	
	return 0;
}

void constroiHeap(int v[], int tamanhoHeap, int pai){
	
	int filhoEsq = pai*2+1,
		filhoDir = pai*2+2;
		
	if(filhoDir < tamanhoHeap){
		
		if(v[filhoDir] > v[filhoEsq] && v[filhoDir] > v[pai]){
			/*SWAP com filho direita*/
			int aux = v[pai];
			v[pai] = v[filhoDir];
			v[filhoDir] = aux;
			/*Desce a ·rvore*/
			constroiHeap(v, tamanhoHeap, filhoDir);
		}
		else if(v[filhoEsq] >= v[filhoDir] && v[filhoEsq] > v[pai]){
			/*SWAP com filho esquerda*/
			int aux = v[pai];
			v[pai] = v[filhoEsq];
			v[filhoEsq] = aux;
			/*Desce a ·rvore*/
			constroiHeap(v, tamanhoHeap, filhoEsq);
		}
	}
	
	else if(filhoEsq < tamanhoHeap) {
		
		if(v[filhoEsq] > v[pai]){
			/*SWAP com filho esquerda*/
			int aux = v[pai];
			v[pai] = v[filhoEsq];
			v[filhoEsq] = aux;
			/*Desce a ·rvore*/
			constroiHeap(v, tamanhoHeap, filhoEsq);
		}
	}
}


void printVetor(int v[]){
	
	int i;
	for(i=0; i<SIZE; i++){
		printf("%d ", v[i]);
	}
	putchar('\n');
}
